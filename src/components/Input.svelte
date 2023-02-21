<script>
	import { addDoc, collection } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig';

	const todosCollention = collection(db, 'todos');
	let newTextTodo = '';

	// ADD TODO
	const addTodo = () => {
		addDoc(todosCollention, {
			task: newTextTodo,
			isComplete: false,
			createdAt: new Date().toISOString()
		});
		newTextTodo = '';
	};

	const addTodoKeyDown = (e) => e.key === 'Enter' && addTodo();
</script>

<header class="shadow-sm">
	<div class="input-group mb-3 ">
		<input
			type="text"
			class="form-control px-4"
			bind:value={newTextTodo}
			on:keydown={addTodoKeyDown}
			placeholder="New task ..."
		/>
		<button class="btn btn-info text-light" on:click={addTodo}>Add</button>
	</div>
</header>

<style>
</style>
