import { useEffect, useState, useContext } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import BadgerNewsItemCard from "./BadgerNewsItemCard";
import { useNavigation } from "@react-navigation/native";
import BadgerNewsContext from "../BadgerNewsContext";

function BadgerNewsScreen(props) {
    // set state variables and context here
    const [articles, setArticles] = useState([])
    const navigation = useNavigation()
    const { prefs, setPrefs } = useContext(BadgerNewsContext);

    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/f24/hw8/articles", {
            headers: {
                "X-CS571-ID": "bid_847d09ed085dacaedc451fd225893d7a6d17095344e4ca85c2843d44093da7cb"
            }
        })
        .then(res => res.json())
        .then(data => {
            setArticles(data)

            // set the initial state for all of the tags to true
            let tags = [];
            for (let i = 0; i < data.length; i++) {
                tags = tags.concat(data[i].tags);  
            }

            let uniqueTags = Array.from(new Set(tags))

            let defaultPrefs = {};
            for (let i = 0; i < uniqueTags.length; i++) {
                defaultPrefs[uniqueTags[i]] = true;  
            }
            setPrefs(defaultPrefs);
        })
    }, [])


    // Got help from Office Hours on this portion
    // filter the previews down to those selected on the preferences page
    // Used this source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    let filter = []
    for (let i = 0; i < articles.length; i++) {
        let bool = true
        for (const [key, value] of Object.entries(prefs)) {
            if (!value) {
                if (articles[i].tags.includes(key)) {
                    bool = false
                    break
                }
            }
        }
        if (bool === false) {
            continue
        }
        for (const [key, value] of Object.entries(prefs)) {
            if (value) {
                if (articles[i].tags.includes(key)) {
                    filter.push(articles[i])
                }
            }
        }
    }
    let uniqueFilter = Array.from(new Set(filter))

    // Navigate to the Article Screen and pass down the params
    // Used this source to understand a bit better: https://reactnavigation.org/docs/params/
    function handlePress(article) {
        navigation.push("Article", { 
            fullArticleId: article.fullArticleId, 
            img: "https://raw.githubusercontent.com/CS571-F24/hw8-api-static-content/main/" + article.img,
            title: article.title
        });
    }

    // Copied this from this source: https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal
    // Checks if all the values in an array are false or not 
    // Indicates if all the preferences have been turned off 
    const allFalse = arr => arr.every((v) => v === false)

    // Figured out how to get the values from this source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
    let vals = Object.values(prefs)

    // Feeds into child component 
    return <View style={styles.main}>
        <ScrollView>
            {uniqueFilter.map((article) => (
                <BadgerNewsItemCard 
                    key={article.fullArticleId}
                    {...article}
                    onPress={() => handlePress(article)}
                    onLongPress={() => handlePress(article)}
                    style={{backgroundColor: "grey"}}
                />
            ))}
        </ScrollView>
        {allFalse(vals) && <Text>There are no articles that fit your preferences!</Text>}
    </View>
}

// Use styling from lectures
const styles = StyleSheet.create({
    main: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }
})  

export default BadgerNewsScreen;