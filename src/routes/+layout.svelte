<script>
	// import '@picocss/pico';
	import Input from '../components/Input.svelte';
</script>

<div class="con container">
	<h1 class="display-1 mb-5 text-primary fw-bold text-center">My Todo List</h1>
	<div class="border rounded bg-secondary-subtle shadow p-4">
		<Input />
		<slot />
	</div>
</div>

<style>
	:global(body) {
		font-family: 'Poppins', serif;
	}

	h1 {
		font-family: 'Oswald', sans-serif;
	}
	.con {
		padding: 3rem 15rem;
	}
</style>
