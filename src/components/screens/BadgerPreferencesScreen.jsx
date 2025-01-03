import { useContext } from "react";
import { Text, View, Switch, StyleSheet } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import BadgerNewsContext from "../BadgerNewsContext"

function BadgerPreferencesScreen(props) {
    // set context
    const { prefs, setPrefs } = useContext(BadgerNewsContext);

    // Copied the code from this source to help build the function: https://reactnative.dev/docs/switch
    // Copied from last HW but changed a bit to deal with booleans
    const toggleSwitch = (tag) => {
        if (prefs[tag] === true) {
            setPrefs(prev => ({
                ...prev,
                [tag]: false
            }))
        }
        else {
            setPrefs(prev => ({
                ...prev,
                [tag]: true
            }));
        }
    }

    // Figured out how to get the tags from the object using this source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    let tags = Object.keys(prefs)

    // prefs[tag] is like the isEnabled from the source
    return <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            {tags.map((tag) => (
                <View style={styles.card} key={tag}>
                    <Text>Currently {prefs[tag] ? "showing" : "NOT showing"} {tag} articles</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={prefs[tag] ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => toggleSwitch(tag)}
                        value={prefs[tag]} 
                    />
                </View>
            ))}
        </SafeAreaView>
    </SafeAreaProvider>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        alignItems: 'center',
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
});

export default BadgerPreferencesScreen;