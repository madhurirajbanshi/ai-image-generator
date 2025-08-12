'use client'
import React from 'react'
import { Button} from '@/components/ui/button'
import {toast} from "sonner"
const HUGGING_FACE_TOKEN = process.env.NEXT_PUBLIC_HUGGING_FACE_TOKEN!;

const Hero = () => {
  const [prompt, setPrompt] = React.useState<string>('');
  const [image, setImage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleImageGeneration = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
        {
          headers: {
            Authorization: `Bearer ${HUGGING_FACE_TOKEN}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              guidance_scale: 7.5,
              num_inference_steps: 20,
              width: 512,
              height: 512
            }
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 503) {
          toast.error('Model is loading, please wait a moment and try again');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.blob();
      const imageUrl = URL.createObjectURL(result);
      setImage(imageUrl);
      toast.success('Image generated successfully!');
      
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image;
    link.download = 'generated-image.png';
    link.click();
  };

  const handleTagClick = (tag: string) => {
    setPrompt(tag);
  };

  return (
    <div className='w-[95%] min-h-screen relative mx-auto mt-[20vh]'>
      <div className='relative z-10 text-white flex flex-col items-center justify-center'>
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center bg-gradient-to-r from-orange-300 to-cyan-500 bg-clip-text text-transparent">
          Create Beautiful Image with <br /> Artificial Intelligence
        </h1>
        <p className='mt-3 text-sm md:text-base font-semibold text-center text-gray-300'>
          Get started with our AI-powered image generator tools
        </p>
        <div className='h-11 md:m-16 w-[70%] md:w-[80%] lg:w-[80%] xl:w-[45%] bg-white rounded-lg mt-12 px-2 md:px-6 flex items-center justify-between'>
          <input
            type="text"
            placeholder='Enter your prompt here...'
            className='w-full h-full bg-transparent outline-none text-gray-800 text-sm md:text-base font-semibold'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleImageGeneration();
              }
            }}
          />
          <Button onClick={handleImageGeneration} variant="default" size="lg" disabled={loading}>
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        </div>
        <div className="w-full flex flex-col items-center  ">
          <p className="text-gray-300  mb-5 font-medium">Popular Tags:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button variant={"secondary"} onClick={() => handleTagClick('Creative abstract art')}>Creative</Button>
            <Button variant={"secondary"} onClick={() => handleTagClick('Hyperrealistic portrait')}>Hyperreality</Button>
            <Button variant={"secondary"} onClick={() => handleTagClick('Steampunk mechanical device')}>Steampunk</Button>
            <Button variant={"secondary"} onClick={() => handleTagClick('Animated character design')}>Animation</Button>
            <Button variant={"secondary"} onClick={() => handleTagClick('Professional business meeting')}>Business</Button>
          </div>
          {loading && (
            <div className="flex flex-col items-center mt-6">
              <div className="animate-spin border-4 border-t-4 border-gray-200 rounded-full w-12 h-12 border-t-cyan-500"></div>
              <p className="text-gray-300 mt-2 text-sm">Generating your image...</p>
            </div>
          )}
          {image && (
            <div className='mt-6 flex flex-col items-center'>
              <img 
                src={image} 
                alt="Generated" 
                className='w-full md:w-[80%] lg:w-[60%] xl:w-[50%] rounded-lg shadow-lg' 
                loading='lazy' 
              />
              <Button 
                onClick={handleDownload} 
                className='mt-4 mb-4 bg-orange-500 hover:bg-orange-600'
              >
                Download Image
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero