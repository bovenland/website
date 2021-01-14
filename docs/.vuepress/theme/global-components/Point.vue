<template>
	<div class="point">
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			viewBox="0 0 164 164" xml:space="preserve">
			<polygon :class="className" points="82,0.5 43.6,9.9 14.1,36.1 0.1,73.1 4.8,112.3 27.3,144.8 62.2,163.2 101.8,163.2 136.7,144.8
				159.2,112.3 163.9,73.1 149.9,36.1 120.4,9.9 "/>
		</svg>
		<div v-if="text">{{ text }}</div>
	</div>
</template>

<script>
export default {
	name: 'Point',
	props: {
		className: String,
		text: String
	}
}
</script>

<style lang="stylus" scoped>
.point {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}

.point > * {
	position: absolute;
	top: 0;
}

.point div {
	text-decoration: none;
}

</style>