<template>
	<div class="flex flex-col">
		<header class="shrink-0 w-full bg-[#222121] p-[16px]">
			HEADER
		</header>
		<main class="w-full h-full flex">
			<aside class="shrink-0 w-[300px] h-[calc(100vh-56px)] bg-[#1b1b1b] p-[16px]">
				LEFT ASIDE
			</aside>
			<section class="w-full h-[calc(100vh-56px)]">
				<RouterView />
			</section>
		</main>
	</div>
</template>
