"use client";

import dynamic from "next/dynamic";

const EffectsRoot = dynamic(() => import("@/components/EffectsRoot"), { ssr: false });

export default EffectsRoot;

