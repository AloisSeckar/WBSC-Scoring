<template>
    <div class="text-center">
        <header class="mt-1 mb-2">
            <h1>WBSC Scoring Creator <span class="demo">DEMO</span></h1>
        </header>
        <div class="text-justify mb-16">
            <slot />
        </div>
        <footer class="fixed bottom-0 left-0 w-full p-1 bg-wbsc-blue text-black">
            Created and maintained by 
            <a href="http://alois-seckar.cz" class="text-white hover:text-yellow-300">Alois Sečkár</a> 
            (2019-2022)
        </footer>
    </div>
</template>