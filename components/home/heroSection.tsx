import React from 'react'

const HeroSection = () => {
  return (
    <section className='relative min-h-[600px] w-full overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-950 to-indigo-950' >
        {/* Dradient overlay  */}
        <div className='absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:bg-gradient-to-r before:from-violet-600/20 before:to-indigo-600/20 before:blur-2xl'/>

        <div className='container relative mx-auto flex h-full flex-col items-center justify-center px-4 py-24 md:flex-row md:py-32' >
            <div className='flex-1 space-y-8 text-center md:text-left'>
                <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl'>
                    Explore the World Through</h1>
                <span className='bg-gradient-to-r from-violet-400 bg-clip-text text-transparent'>Words</span>
            </div>


        </div>



    </section>
  )
}

export default HeroSection