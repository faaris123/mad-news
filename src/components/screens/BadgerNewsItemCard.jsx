import { Pressable, StyleSheet, View, Text, Image } from "react-native";

export default function BadgerNewsItemCard(props) {

    // Copied this entire file from lecture code examples
    return <Pressable onPress={props.onPress} onLongPress={props.onLongPress}>
        <View style={[styles.card, props.style]}>
            <Image style = {{width: '100%', height: 250, alignSelf: 'center'}} source = {{uri: "https://raw.githubusercontent.com/CS571-F24/hw8-api-static-content/main/" + props.img}}/>
            <Text>{props.title}</Text>
        </View>
    </Pressable>
}

// Copied styling from lecture code examples
const styles = StyleSheet.create({
    card: {
        padding: 16,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'slategray',
        shadowOffset: {
          width: 4,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    }
})