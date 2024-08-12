import dynamic from "next/dynamic";

import { SurveyData } from "../types";
import { Socket } from "socket.io-client";

interface SurveyComponentProps {
  data: SurveyData;
  socket: Socket;
  surveyVisible: boolean;
}

const SurveyComponent: React.FC<SurveyComponentProps> = ({
  data,
  socket,
  surveyVisible = true,
}) => {
  let Survey;
  switch (data.id) {
    case 0:
      Survey = dynamic(() => import("./Survey0"), { ssr: false });
      break;
    case 1:
      Survey = dynamic(() => import("./Survey1"), { ssr: false });
      break;
    case 2:
      Survey = dynamic(() => import("./Survey2"), { ssr: false });
      break;
    // 他のケースも追加可能
    default:
      return <div>Unknown Survey</div>;
  }

  return <Survey data={data} socket={socket} visible={surveyVisible} />;
};

export default SurveyComponent;
