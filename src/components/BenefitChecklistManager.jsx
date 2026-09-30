import React from "react";
import PrivilegeSwitchManager, { ALL_STANDARD_PRIVILEGES } from "./PrivilegeSwitchManager";

export { ALL_STANDARD_PRIVILEGES };

export default function BenefitChecklistManager(props) {
  return <PrivilegeSwitchManager {...props} defaultMode="list" />;
}
