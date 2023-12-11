# videoTrimmer

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
2. Video Reassembly: Create functionality to reassemble video segments into a
single file based on client parameters, possibly including different
combinations of audio and video codecs.
3. Client-Parameter Based Serving: Develop a system to serve different versions of
the processed video based on client specifications (e.g., codec preferences,
resolution).

Usage

