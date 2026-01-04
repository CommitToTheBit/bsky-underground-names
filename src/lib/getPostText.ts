import Bot from "././bot.js";

import data from '../../stations.json' with { type: "json" };

interface Station
{
	name : string;
	tla : string;
}

export default async function getPostText()
{
	var word : string = "Underground".toLowerCase();
	var stations : Station[] = data;

	var accepted : number[] = [];

	for (var i = 0; i < data.length; ++i)
	{
		var station : Station = data[i]
		var valid : boolean = true;
		for (var j = 0; valid && j < word.length; ++j)
		{
			valid = valid && !station.name.toLowerCase().includes(word[j]);
		}

		if (valid)
		{
			accepted.push(i);
		}
	}

	switch (accepted.length)
	{
		case 0:
		{
			return "every station contains one or more letters from the word " + word;
		}
		case 1:
		{
			var post : string = stations[accepted[0]].name.toLowerCase() + " is the only station without any letters in the word " + word;

			return post;
		}
		case 2:
		{
			var post : string = stations[accepted[0]].name.toLowerCase() + " and " + stations[accepted[1]].name.toLowerCase() + " are the only stations without any letters in the word " + word;

			return post;
		}
	}

	var post : string = "";
	var index : number = 0;
	for (; index < accepted.length - 1; ++index)
	{
		post += stations[accepted[index]].name.toLowerCase() + ", ";
	}
	post += "and " + stations[accepted[index]].name.toLowerCase() + " are the only stations without any letters in the word " + word;

	return post;
}
