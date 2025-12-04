export const TASK_FILTERS = [
    {
      category: "CHAT",
      children: [
        { id: "text-to-text", label: "Text-to-Text" },
        { id: "text-to-code", label: "Text-to-Code" },
        { id: "translation", label: "Translation" },
        { id: "doc-to-text", label: "Doc-to-Text" },
        { id: "image-to-text", label: "Image-to-Text" },
        { id: "summarization", label: "Summarization" },
        { id: "instruction-following", label: "Instruction Following" },
      ],
    },
  
    {
      category: "IMAGE GENERATION",
      children: [
        { id: "text-to-image", label: "Text-to-Image" },
        { id: "image-to-image", label: "Image-to-Image" },
      ],
    },
  
    {
      category: "VIDEO GENERATION",
      children: [
        { id: "image-to-video", label: "Image-to-Video" },
        { id: "text-to-video", label: "Text-to-Video" },
      ],
    },
  
    {
      category: "MUSIC GENERATION",
      children: [
        { id: "text-to-audio", label: "Text-to-Audio" },
        { id: "audio-to-audio", label: "Audio-to-Audio" },
      ],
    },
  
    {
      category: "3D GENERATION",
      children: [
        { id: "text-to-3d", label: "Text-to-3D" },
        { id: "image-to-3d", label: "Image-to-3D" },
      ],
    },
  
    {
      category: "AI SEARCH",
      children: [{ id: "search", label: "Search" }],
    },
  
    {
      category: "CODE GENERATION",
      children: [
        { id: "code-to-code", label: "Code-to-Code" },
        { id: "text-to-code", label: "Text-to-Code" },
      ],
    },
  
    {
      category: "EMBEDDINGS",
      children: [{ id: "text-embedding", label: "Text Embedding" }],
    },
  
    {
      category: "SAFETY & MODERATION",
      children: [{ id: "content-moderation", label: "Content Moderation" }],
    },
  
    {
      category: "VOICE MODEL",
      children: [
        { id: "speech-to-text", label: "Speech-to-Text" },
        { id: "text-to-speech", label: "Text-to-Speech" },
      ],
    },
  
    {
      category: "OCR",
      children: [
        { id: "image-to-text", label: "Image-Text-to-Text" },
        { id: "pdf-to-text", label: "PDF-to-Text" },
      ],
    },
  ];
  