import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, ScrollView, Image } from 'react-native';

export default function App() {
	// VVVV THIS IS A PLACEHOLDER API VVVV
	const apiurl = 'http://www.omdbapi.com/?i=tt3896198&apikey=4d6d44bc';
	// const apiurl = 'https://api.jikan.moe/v3/';
	const [ state, setState ] = useState({
		s: 'Enter a manga...',
		results: [],
		selected: {}
	});

	const search = () => {
		// &s= is a query paramater
		axios(apiurl + '&s=' + state.s).then(({ data }) => {
			let results = data.Search;
			console.log(results);
			setState((prevState) => {
				return { ...prevState, results: results };
			});
		});
	};
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Manga Search</Text>
			<TextInput
				style={styles.searchbox}
				onChangeText={(text) =>
					setState((prevState) => {
						return { ...prevState, s: text };
					})}
				onSubmitEditing={search}
				value={state.s}
			/>

			<ScrollView style={styles.results}>
				{state.results.map((result) => (
					//change .imdbID, .Title, & .Poster when manga API is set
					<View key={result.imdbID} style={styles.result}>
						<Image
							source={{ uri: result.Poster }}
							style={{
								width: '100%',
								height: 300
							}}
							resizeMode="cover"
						/>
						<Text style={styles.heading}>{result.Title}</Text>
					</View>
				))}
			</ScrollView>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#223343',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop: 70,
		paddingHorizontal: 20
	},
	title: {
		color: '#fff',
		fontSize: 32,
		fontWeight: '700',
		textAlign: 'center',
		marginBottom: 20
	},
	searchbox: {
		fontSize: 20,
		fontWeight: '300',
		padding: 20,
		width: '100%',
		backgroundColor: '#fff',
		borderRadius: 8,
		marginBottom: 40
	},
	results: {
		flex: 1
	},
	result: {
		flex: 1,
		width: '100%',
		marginBottom: 20
	},
	heading: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '700',
		padding: 20,
		backgroundColor: '#445565'
	}
});
