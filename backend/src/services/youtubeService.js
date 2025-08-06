// backend/src/services/youtubeService.js

import axios from 'axios';
import dotenv from 'dotenv'; 
dotenv.config(); 

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export const getVideosByQuery = async (query, maxResults = 1) => { 
    if (!YOUTUBE_API_KEY) {
        console.error("YOUTUBE_API_KEY is not defined in environment variables.");
        throw new Error("YouTube API key is missing.");
    }

    try {
        const response = await axios.get(YOUTUBE_BASE_URL, {
            params: {
                key: YOUTUBE_API_KEY,
                q: query,
                part: 'snippet', 
                type: 'video',
                maxResults: maxResults
            }
        });

        return response.data.items.map(item => ({
            videoId: item.id.videoId, 
            title: item.snippet.title,
            description: item.snippet.description, 
            thumbnail: item.snippet.thumbnails.high.url,
            channelTitle: item.snippet.channelTitle, 
            duration: 'N/A' 
        }));
    } catch (error) {
        console.error('YouTube API Error:', error.response?.data || error.message);
        throw new Error('Failed to fetch videos from YouTube. Please check the API key and query.');
    }
};
