### videoTrimmer

This project is about creating a Node.js app that does the following:

1. API Endpoint: Fastify server with an endpoint to upload a video file.
2. Video Trimming: Implementing functionality to trim the video based on provided
start and end times.
3. Video Resizing: Implementing functionality to resize the video to specified
dimensions.
4. Error Handling: Ensure robust error handling, especially for file uploads and
FFmpeg processing.
5. Response: After processing, the server should return a message indicating
success or failure.

Bonus Tasks:
1. Video Splitting: Extend the service to split the video into audio codec (aac ,
opus) and video codecs(h264,vp9,av1)

### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Running the App](#running-the-app)
  - [API Endpoints](#api-endpoints)
  - [Environment Variables](#environment-variables)

### Installation

```bash
# Clone the repository
git clone git@gitlab.com:yutapp1/videoTrimmer.git

# Change into the project directory
cd videoTrimmer

# Install dependencies
npm install
```

### Usage

<h4>Configuration</h4>

Copy the sample environment file and modify it as needed.

```bash
# Create a copy of the sample environment file
cp .env.sample .env
```

<h4>Running the App</h4>

Use the following command to run the app in production mode.

```bash
# Run the application in production mode
npm run start

```

Or in development mode with automatic reload on file changes.

```bash
# Run the application in development mode
npm run dev

```

## API Endpoints

- **POST /upload**
  - **Description:** Endpoint for uploading files.
  - **Parameters:**
    - `start` (Number): Represents the start time (in seconds) for splitting the video. Must be a non-negative integer.
    - `end` (Number): Represents the end time (in seconds) for splitting the video. Must be greater than the `start` time.
    - `width` (Number): Specifies the new width of the video. Must be a positive integer.
    - `height` (Number): Specifies the new height of the video. Must be a positive integer.
    - `audioCodec` (String): Specifies the audio codec for the video file. Choose from supported audio codecs such as AAC, MP3, etc.
    - `videoCodec` (String): Specifies the video codec for the video file. Choose from supported video codecs such as H.264, VP9, AV1, etc.

## Environment Variables

  - `PORT`: Set the port for the application. The default is 4000.