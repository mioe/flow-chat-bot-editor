<template>
	<div class="flex flex-col">
		<header class="shrink-0 w-full h-[64px] bg-$ui-white p-[16px] border-0 border-b border-solid border-$deviders-primary" />
		<main class="w-full h-full flex">
			<aside class="shrink-0 w-[56px] h-[calc(100vh-56px)] bg-$ui-white p-[16px] border-0 border-r border-solid border-$deviders-primary" />
			<section class="w-full h-[calc(100vh-56px)] flex flex-col">
				<RouterView />
			</section>
		</main>
	</div>
</template>
