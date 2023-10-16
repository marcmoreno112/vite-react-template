import { ScaleNotification } from "@telekom/scale-components-react";
import "./componentsVisual.scss";

interface TNotification {
  heading?: string;
  variant: "danger" | "warning" | "success" | "informational";
  onClose: () => void;
  text?: string;
}

export default function Notification({
  heading,
  variant = "success",
  onClose,
  text,
}: TNotification) {
  return (
    <ScaleNotification
      className="scl-toast-stack"
      heading={heading}
      type="toast"
      variant={variant}
      dismissible
      opened
      delay={5000}
      onScale-close={() => onClose()}
    >
      <span slot="text">{text}</span>
    </ScaleNotification>
  );
}
