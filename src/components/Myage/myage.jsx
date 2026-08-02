import { useState } from "react";
import useMyAgeLogic from "./MyAgeLogic.jsx";
import { useTranslation } from "react-i18next";
import { ShieldAlert } from "lucide-react";
import Tooltip from "../header/Tooltip";

const MyAge = () => {
  const {t} = useTranslation()
  const [fechaNacimiento, setFechaNacimiento] = useState("2004-12-11");
  const edad = useMyAgeLogic(fechaNacimiento);
  
  return (
    <div className="flex items-center">
      <Tooltip text={t("TiempodeVida.Edad")} position="bottom">
        <div 
          className="relative flex items-center justify-center w-10 h-10 rounded-sm border border-redteam/40 bg-redteam/10 group cursor-default transition-all duration-300 hover:border-redteam hover:bg-redteam/20 hover:shadow-[0_0_20px_rgba(255,45,85,0.5)]"
        >
          {/* Ícono de ciberseguridad */}
          <ShieldAlert className="w-7 h-7 text-redteam/80 group-hover:text-redteam transition-colors animate-[pulse-red-border_2s_infinite]" strokeWidth={1.5} />
          
          {/* Edad en el centro */}
          <span 
            className="absolute font-jetbrains text-[11px] font-bold text-white group-hover:text-white transition-colors" 
            style={{ marginTop: '2px' }}
          >
            {edad}
          </span>
        </div>
      </Tooltip>
    </div>
  );
};

export default MyAge;
