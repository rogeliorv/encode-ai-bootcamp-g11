Set the following environment variable:

NEXT_PUBLIC_OPENAI_API_KEY=<YOUR_OPEN_AI_KEY>

Important note: This will expose your open ai key to the client, so dont upload this to a prod environment. This is only to test this project quickly, letting the client side
access open ai api. If you need to re-use this project, create some server functions
and use the environment variable OPENAI_API_KEY instead


1.- Run npm install
2.- Run npm run dev
3.- Go to the project and write a description of a famous painting. E.g: Famous davinci painting of a girl smiling
4.- Once the assistant has guessed the painting, click the "Generate Painting" button
