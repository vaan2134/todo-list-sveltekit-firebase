<script>
	import {
		collection,
		onSnapshot,
		query,
		orderBy,
		deleteDoc,
		doc,
		updateDoc,
		serverTimestamp
	} from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig';
	import { onMount } from 'svelte';

	let todos = [];
	let loading = true;

	const todosCollection = collection(db, 'todos');

	onMount(() => {
		const sortTodosQuery = query(todosCollection, orderBy('createdAt', 'desc'));

		// READ DB
		onSnapshot(sortTodosQuery, (querySnapshot) => {
			let fbTodos = [];
			querySnapshot.forEach((doc) => {
				let todo = { ...doc.data(), id: doc.id };
				fbTodos = [todo, ...fbTodos];
			});
			todos = fbTodos;
			loading = false;
		});
	});

	// DEL TODO
	const delTodo = (id) => {
		const todoDoc = doc(todosCollection, id);
		deleteDoc(todoDoc);
	};

	// CHECK
	const handlerCheck = (id) => {
		const todo = todos.find((t) => t.id === id);
		if (todo) {
			updateDoc(doc(todosCollection, id), {
				isComplete: todo.isComplete
			});
		}
	};
</script>

{#if loading}
	<article aria-busy="true" />
{:else}
	<ul>
		{#each todos as todo (todo.id)}
			<li
				class={todo.isComplete
					? 'bg-danger text-light px-4 rounded my-3 '
					: 'bg-info-subtle rounded px-4 my-3 shadow'}
			>
				<input
					class="form-check-input"
					type="checkbox"
					bind:checked={todo.isComplete}
					on:change={() => handlerCheck(todo.id)}
				/>
				<div class="d-flex container-fluid justify-content-between align-items-center">
					<p class="m-0" class:done={todo.isComplete}>{todo.task}</p>
					<p class="m-0" class:done={todo.isComplete}>
						{new Date(todo.createdAt).toLocaleString()}
					</p>
				</div>
				<button class="btn btn-info text-light" on:click={delTodo(todo.id)}>Del</button>
			</li>
		{/each}
	</ul>
{/if}

<style>
	ul {
		padding: 0;
	}
	ul li {
		display: flex;
		height: 70px;
		gap: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	input {
		width: 25px;
		height: 20px;
	}

	li > button {
		padding: 8px 30px;
		margin: 0;
	}

	.done {
		text-decoration: line-through;
	}
</style>
