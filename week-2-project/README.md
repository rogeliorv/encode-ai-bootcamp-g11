- Run locally your own Text Generation Web UI (https://github.com/oobabooga/text-generation-webui)

Many models require specialized hardware, so we will be using a CPU only model called capybarahermes-2.5-mistral-7b.Q2_K.gguf

This model is huge, so download it and go for a coffee (or 2, or 3 dependint on your  internet connection) (Download: https://huggingface.co/TheBloke/CapybaraHermes-2.5-Mistral-7B-GGUF)

- Load the model in your WebUI (this should not throw NVIDIA or CUDA errors like other models)

- Run the NextJS solution for Week 2 project using npm run dev

- Go to localhost:3000 to interact with the single page app which is a bot by selecting a genre and a tone

- Alternatively you can also interact with the api under /api/chat
