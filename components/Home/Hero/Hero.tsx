import React from 'react'
import { Button} from '@/components/ui/button'

const Hero = () => {
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
          />
          <Button variant="default" size="lg">
            Generate
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
