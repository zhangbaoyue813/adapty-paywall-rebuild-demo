import React from "react";
import PrivilegeSwitchManager, { ALL_HELLOTALK_PRIVILEGES } from "./PrivilegeSwitchManager";

export { ALL_HELLOTALK_PRIVILEGES };

export default function BenefitChecklistManager(props) {
  return <PrivilegeSwitchManager {...props} defaultMode="list" />;
}
