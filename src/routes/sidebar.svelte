<script>
	// from https://svelte.dev/repl/82b00644720a4ca2bdb89c6a653ec987
	import TreeView from './TreeView.svelte'

	const tree = {
		label: "USA", children: [
			{label: "Florida", children: [
				{label: "Jacksonville"},
				{label: "Orlando", children: [
					{label: "Disney World"},
					{label: "Universal Studio"},
					{label: "Sea World"},
				]},
				{label: "Miami"},
			]},
			{label: "California", children: [
				{label: "San Francisco"},
				{label: "Los Angeles"},
				{label: "Sacramento"},
			]},
		],
	}
</script>

<div class="w-60 bg-gray-800 text-white pb-2 border-r border-gray-600">
    <div class="head px-4 py-2 border-y border-gray-600">Files</div>
    <TreeView {tree} />
</div>
