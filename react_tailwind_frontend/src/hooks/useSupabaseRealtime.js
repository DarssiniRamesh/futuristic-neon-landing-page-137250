import { useEffect, useRef, useState } from "react";
import { getSupabaseClient } from "../lib/supabaseClient";

/**
 * Subscribe to realtime row-level events for a given table.
 * Default table: 'messages'
 *
 * Example:
 * const { events, status, error } = useSupabaseRealtime({ table: 'messages' });
 * 
 * status: 'idle' | 'connecting' | 'connected' | 'error'
 * events: array of { type: 'INSERT'|'UPDATE'|'DELETE', payload }
 */

// PUBLIC_INTERFACE
export function useSupabaseRealtime({ table = "messages", schema = "public", enabled = true } = {}) {
  /** This is a public hook to listen to realtime events on a Supabase table. */
  const supabase = getSupabaseClient();
  const [status, setStatus] = useState(enabled ? "connecting" : "idle");
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const channelRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      setStatus("idle");
      return;
    }

    try {
      const channel = supabase
        .channel(`realtime:${schema}:${table}`)
        .on(
          "postgres_changes",
          { event: "*", schema, table },
          (payload) => {
            setEvents((prev) => [
              ...prev,
              { type: payload.eventType, payload },
            ]);
          }
        )
        .subscribe((subscriptionStatus) => {
          if (subscriptionStatus === "SUBSCRIBED") {
            setStatus("connected");
          }
        });

      channelRef.current = channel;
    } catch (err) {
      setError(err);
      setStatus("error");
    }

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
    // We rely on stable supabase client instance from getSupabaseClient
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, table, schema]);

  return { events, status, error };
}
