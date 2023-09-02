import { SubLayout } from "../components/Common/SubLayout";
import { Text, View } from 'react-native';
import { useState, useEffect } from "react";
import { themeColors } from "../theme";
import YoutubeIframe from "react-native-youtube-iframe";

export const VideoPlayerScreen = ({ route }) => {
    const [title, setTitle] = useState('');
    const [videoId, setVideoId] = useState('');

    useEffect(() => {
        setTitle(route.params?.title);
        setVideoId(route.params?.videoId);
    }, [route.params])

    return <SubLayout goBackButton={true} title="Video">
        <View style={{
            flex: 1,
            backgroundColor: themeColors.bgScreen,
            justifyContent: 'center'
        }}>
            <Text className="text-lg text-white font-extrabold ml-3 mb-3">
                {title}
            </Text>
            <YoutubeIframe
                height={300}
                play={true}
                videoId={videoId}
            />
        </View>
    </SubLayout>;
};
