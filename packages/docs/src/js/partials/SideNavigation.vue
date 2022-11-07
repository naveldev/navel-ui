<template>
	<nav class="nav-left" :class="{ 'nav-collapsed': !navigationState }">
        <div class="d-flex align-items-center md:d-none p-3">
            Documentation

            <a class="ml-auto" @click.prevent="toggleState(!this.navigationState)">
               <div v-if="navigationState">
                    <v-icon icon="fa-xmark" />
                </div>
                <div v-else>
                    <v-icon icon="fa-bars-staggered" />
                </div>
            </a>
        </div>

        <div class="nav-collapse p-3">
            <!-- Getting Started -->
            <div class="nav-label">
                <div class="label-icon">
                    <i class="fa-regular fa-house"></i>
                </div>

                <p>Getting Started</p>
            </div>

            <ul class="nav-list">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'docs' }">
                        Getting Started
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'docs.installation' }">
                        Installation
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'docs.configuration' }">
                        Configuration
                    </router-link>
                </li>
            </ul>

            <!-- Components -->
            <div class="nav-label mt-3">
                <div class="label-icon">
                    <i class="fa-regular fa-layer-group"></i>
                </div>

                <p>Components</p>
            </div>

            <ul class="nav-list">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'docs.components.nav-top' }">
                        Top Nav
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'docs.components.button' }">
                        Button
                    </router-link>
                </li>
            </ul>

            <!-- Vue Components -->
            <div class="nav-label mt-3">
                <div class="label-icon">
                    <i class="fa-brands fa-vuejs"></i>
                </div>

                <p>Vue Components</p>
            </div>

            <ul class="nav-list">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'docs.vue' }">
                        Installation
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'docs.vue.input' }">
                        Input
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'docs.vue.datepicker' }">
                        DatePicker
                    </router-link>
                </li>
            </ul>

            <!-- Plugins -->
            <div class="nav-label mt-3">
                <div class="label-icon">
                    <i class="fa-regular fa-puzzle-piece-simple"></i>
                </div>

                <p>Plugins</p>
            </div>

            <ul class="nav-list">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'docs.plugins.snackbar' }">
                        Snackbar
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'docs.plugins.vue-form' }">
                        Vue Form
                    </router-link>
                </li>
            </ul>
        </div>
	</nav>
</template>

<script>
	export default {
		name: 'SideNavigation',

        data() {
            return {
                navigationState: false
            }
        },

        methods: {
			/**
			 * Set the navigation state and save it in the localStorage
			 *
			 * @return  {boolean}
			 */
			toggleState(state) {
				return this.navigationState = state
			},
        },
	}
</script>

<style scoped>
.nav-left {
    max-width: 300px;
    height: auto;
}
.nav-left label
{
    text-transform: uppercase;
    color: rgb(var(--color-muted));
    display: block;
    padding: 15px;
    font-size: 14px;
}
</style>
