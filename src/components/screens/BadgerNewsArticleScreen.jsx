import { useEffect, useState, useRef, useCallback } from "react";
import { Linking, Animated, Text, View, StyleSheet, Image, Button, ScrollView } from "react-native";

function ArticleScreen(props) {
    // Used the lecture code example to figure out how to transfer the fullArticleId
    const fullArticleId = props.route.params.fullArticleId
    const img = props.route.params.img
    const title = props.route.params.title
    // Set the state variables here
    const [article, setArticle] = useState([])
    const [loading, setLoading] = useState(true)
    // Copied animations from the lecture code examples
    const fadeAnim = useRef(new Animated.Value(0));

    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/f24/hw8/article?id=" + fullArticleId, {
            headers: {
                "X-CS571-ID": "bid_847d09ed085dacaedc451fd225893d7a6d17095344e4ca85c2843d44093da7cb"
            }
        })
        .then(res => res.json())
        .then(data => {
            setArticle(data)
            setLoading(false)
            Animated.timing(fadeAnim.current, {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true,
            }).start()
        })
    }, [])

    // Copied this portion from this source: https://reactnative.dev/docs/linking#example
    const OpenURLButton = ({url, children}) => {
        const handlePress = useCallback(async () => {
            // Checking if the link is supported for links with custom URL scheme.
            const supported = await Linking.canOpenURL(url);
      
            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);
      
        return <Button title={children} onPress={handlePress} />;
    };

    // Used this source to figure out how to set the width of the Image: https://reactnative.dev/docs/height-and-width
    return <View style={styles.main}>
        <ScrollView>
            <Image style = {{width: "100%", height: 250, alignSelf: 'center'}} source = {{uri: img}}/>
            <Text>{title}</Text>
            <Text></Text>
            {loading && <Text style={styles.main}>The article is loading</Text>}
            {!loading && <Animated.View style={{fontSize: 40, opacity: fadeAnim.current}}>
                <Text></Text>
                <Text>By {article.author} on {article.posted}</Text>
                <OpenURLButton url={article.url}>Read Full Article Here</OpenURLButton>
                <Text></Text>
                {article.body.map((body) => (
                    <Text key={body}>{body}</Text>
                ))}
            </Animated.View>}
        </ScrollView>
    </View>
}

// Copied styling from code examples
const styles = StyleSheet.create({
    main: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    }
})

export default ArticleScreen;