import { useEffect } from "react";
import { useMicAccess } from "./MicAccessContext";

export const MicPermissionManager: React.FC = () => {
  const { setHasMicAccess } = useMicAccess();

  useEffect(() => {
    const checkMicPermissions = async () => {
      try {
        const status = await navigator.permissions.query({
          name: "microphone" as PermissionName,
        });

        if (status.state === "granted") {
          setHasMicAccess(true);
        } else if (status.state === "denied") {
          setHasMicAccess(false);
        } else {
          try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            setHasMicAccess(true);
          } catch {
            setHasMicAccess(false);
          }
        }
      } catch (err) {
        console.error("Error checking microphone permissions:", err);
        setHasMicAccess(false);
      }
    };

    checkMicPermissions();
  }, [setHasMicAccess]);

  // No visual UI
  return null;
};
