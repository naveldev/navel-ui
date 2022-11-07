<template>
	<nav class="nav-top nav-primary p-3 md:py-2" :class="{ 'nav-collapsed': !navigationState }">
        <div class="container d-flex flex-row align-items-center">
            <h3 class="nav-branding">
                Navel UI
            </h3>

            <div class="nav-collapse md:d-flex flex-grow-1 align-items-center">
                <ul class="nav-list">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'home' }">
                            Home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'docs' }">
                            Documentation
                        </router-link>
                    </li>
                </ul>

                <ul class="nav-list ml-auto">
                    <li class="nav-button">
                        <v-dropdown :options="{ direction: 'right', closeTrigger: true }">
                            <!-- Title -->
                            <template v-slot:title>
                                <a class="btn btn-outline btn-primary color-primary-100 d-flex" href="#">
                                    v2.0.1

                                    <span class="ml-auto pl-3">
                                        <i class="fa-regular fa-chevron-down"></i>
                                    </span>
                                </a>
                            </template>

                            <!-- Content -->
                            <template v-slot:dropdown-content>
                                <li class="nav-item">
                                    <a class="nav-link color-gray-900" target="_blank" href="https://github.com/naveldev/navel-ui">
                                        GitHub

                                        <span class="ml-auto">
                                            <i class="fa-regular fa-up-right-from-square"></i>
                                        </span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link color-gray-900" target="_blank" href="https://github.com/naveldev/navel-ui/issues/new/choose">
                                        Report a issue

                                        <span class="ml-auto">
                                            <i class="fa-regular fa-up-right-from-square"></i>
                                        </span>
                                    </a>
                                </li>
                            </template>
                        </v-dropdown>
                    </li>
                </ul>
            </div>

            <a class="ml-auto md:d-none" @click.prevent="toggleState(!this.navigationState)">
                <div v-if="navigationState">
                    <v-icon icon="fa-xmark" />
                </div>
                <div v-else>
                    <v-icon icon="fa-bars-staggered" />
                </div>
            </a>
        </div>
	</nav>
</template>

<script>
	export default {
		name: 'Navigation',

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
