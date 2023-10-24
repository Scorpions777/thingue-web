import {Config, Logger, PixelStreaming} from "@epicgames-ps/lib-pixelstreamingfrontend-ue5.3";
import {v4 as uuidv4} from "uuid";

let stream: PixelStreaming;

function createStream() {
    Logger.SetLoggerVerbosity(-1)
    const config = new Config({
        initialSettings: {
            AutoPlayVideo: true,
            AutoConnect: true,
            HoveringMouse: true,
            StartVideoMuted: true,
            MatchViewportRes: true,
            ss: 'ws://127.0.0.1:8877/ws/player/test'
        },
        useUrlParams: true
    });

    stream = new PixelStreaming(config, {})
    
    // 监听UE发过来的数据
    stream.addResponseEventListener("abcd", function (response) {
        console.log(response)
    })

    // 移除监听
    stream.removeResponseEventListener("abcd")
}

// 向UE发送数据
function sendUserCommand(param: any) {
    const uuid = uuidv4();
    console.log(param)
    stream.emitUIInteraction({
        type: "UserCommand",
        uuid,
        command: "ToUEMessage",
        param
    })
}

export {
    stream, createStream, sendUserCommand
}

