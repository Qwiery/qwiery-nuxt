<template>
	<!-- Toolbar -->
	<div class=" ">
		<div class="relative flex w-full items-center bg-white dark:bg-[#333333]">
			<!--Schema or Explore-->
			<div class="flex ltr:mr-2 sm:block">
				<ul class="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#a1a1aa]">
					<li>
						<!-- Hamburger left panel-->
						<button class="ml-2 p-1" @click="toggleLeft()" title="Toggle the left panel" v-if="isHamburgerIconVisible">
							<svg height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g class="hover:stroke-sky-300" fill="transparent">
									<rect width="24" height="24" rx="5" ry="5"></rect>
									<path width="24" d="M19 10L5 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
									<path d="M19 14L5 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
									<path d="M19 6L5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
									<path d="M19 18L5 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
								</g>
							</svg>
						</button>
					</li>
					<li>
						<button type="button" class="hover:bg-sky-300 btn btn-primary" @click="generateSampleGraph()">Generate</button>
					</li>
					<li>
						<button type="button" class="hover:bg-sky-300 btn btn-primary" @click="showPerspective('schema')" title="Show the inferred database schema (if any)">Schema</button>
					</li>
					<li>
						<button type="button" class="hover:bg-sky-300 btn btn-primary" @click="showPerspective('explorer')" title="Show the data exploration perspective">Explorer</button>
					</li>
				</ul>
			</div>
			<div class="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto dark:text-[#a1a1aa] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
				<!--Explore Section-->
				<div class="border-r-2 border-primary pt-3 pr-2" v-if="isExploreSectionVisible">
					<div class="absolute top-0 pl-1 z-20 dark:text-neutral-500 text-xs">Explore</div>
					<ul class="flex items-center mt-1 space-x-2 rtl:space-x-reverse dark:text-[#a1a1aa]">
						<li>
							<!-- Search database-->
							<button type="button" class="bg-none border-none p-1 w-5">
								<svg class="hover:fill-sky-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 150.817 150.817" xml:space="preserve" stroke="currentColor">
									<g>
										<g>
											<path
												d="M58.263,64.946c3.58-8.537,9.834-16.039,18.456-21.02c6.644-3.842,14.225-5.876,21.902-5.876 c6.376,0,12.568,1.461,18.207,4.031V21.677C116.829,9.706,92.563,0,62.641,0C32.71,0,8.448,9.706,8.448,21.677v21.681 C8.436,54.75,30.372,64.061,58.263,64.946z M62.629,5.416c29.77,0,48.768,9.633,48.768,16.255c0,6.634-18.998,16.258-48.768,16.258 c-29.776,0-48.774-9.624-48.774-16.258C13.855,15.049,32.853,5.416,62.629,5.416z M8.429,75.883V54.202 c0,10.973,20.396,20.015,46.841,21.449c-1.053,7.21-0.311,14.699,2.375,21.799C30.055,96.445,8.436,87.184,8.429,75.883z M95.425,125.631c-9.109,2.771-20.457,4.445-32.796,4.445c-29.931,0-54.193-9.706-54.193-21.684V86.709 c0,11.983,24.256,21.684,54.193,21.684c0.341,0,0.673-0.018,1.014-0.018C71.214,118.373,82.827,124.656,95.425,125.631z M131.296,63.11c-10.388-17.987-33.466-24.174-51.46-13.785c-17.987,10.388-24.173,33.463-13.792,51.45 c10.388,17.993,33.478,24.174,51.465,13.798C135.51,104.191,141.684,81.102,131.296,63.11z M71.449,97.657 C62.778,82.66,67.945,63.394,82.955,54.72c15.01-8.662,34.275-3.504,42.946,11.509c8.672,15.013,3.502,34.279-11.508,42.943 C99.377,117.85,80.117,112.686,71.449,97.657z M139.456,133.852l-16.203,9.353l-12.477-21.598l16.209-9.359L139.456,133.852z M137.708,149.562c-4.488,2.582-10.199,1.06-12.794-3.429l16.216-9.353C143.718,141.268,142.184,146.979,137.708,149.562z"
											></path>
										</g>
									</g>
								</svg>
							</button>
						</li>
						<li>
							<!-- Auto Search-->
							<button type="button" class="bg-none border-none p-1 w-5">
								<svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									<g>
										<path
											class="hover:stroke-sky-300"
											d="M5 4H17M5 8H13M5 12H9M5 16H8M5 20H11M16.4729 17.4525C17.046 16.8743 17.4 16.0785 17.4 15.2C17.4 13.4327 15.9673 12 14.2 12C12.4327 12 11 13.4327 11 15.2C11 16.9673 12.4327 18.4 14.2 18.4C15.0888 18.4 15.893 18.0376 16.4729 17.4525ZM16.4729 17.4525L19 20"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
									</g>
								</svg>
							</button>
						</li>
						<li>
							<!-- Clear Canvas-->
							<button type="button" class="bg-none border-none p-1 w-5" @click="clearGraph()">
								<svg class="hover:fill-sky-300" fill="currentColor" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.999 511.999" xml:space="preserve">
									<g>
										<g>
											<g>
												<path
													d="M296.746,279.798c-4.668-13.065-8.542-23.919-11.204-31.369c-0.683-1.903-2.56-3.029-4.557-2.739 c-7.936,1.152-16.316,1.775-25.02,1.775c-8.653,0-16.998-0.606-24.9-1.758c-1.997-0.29-3.874,0.836-4.557,2.739l-11.221,31.411 c-0.836,2.33,0.435,4.932,2.825,5.572c10.923,2.918,23.697,4.702,37.854,4.702c14.208,0,27.034-1.792,37.973-4.736 C296.328,284.756,297.582,282.12,296.746,279.798z"
												></path>
											</g>
										</g>
										<g>
											<g>
												<path
													d="M307.669,310.382l-2.313-6.468c-0.768-2.15-2.987-3.243-5.154-2.628c-13.116,3.763-28.117,5.914-44.237,5.914 c-16.077,0-31.036-2.133-44.126-5.871c-2.167-0.614-4.395,0.503-5.154,2.628l-2.321,6.502c-0.768,2.15,0.239,4.574,2.364,5.41 c12.954,5.06,29.807,8.397,49.237,8.397c19.49,0,36.386-3.354,49.357-8.448C307.447,314.981,308.437,312.532,307.669,310.382z"
												></path>
											</g>
										</g>
										<g>
											<g>
												<path
													d="M255.078,0.016c-9.429,0.418-16.179,7.45-16.179,17.05v207.795c0,2.022,1.382,3.831,3.371,4.224 c4.284,0.836,8.849,1.314,13.653,1.314c4.838,0,9.429-0.486,13.747-1.331c1.98-0.401,3.362-2.21,3.362-4.232V17.962 C273.032,8.054,264.976-0.419,255.078,0.016z"
												></path>
											</g>
										</g>
										<g>
											<g>
												<path
													d="M366.498,475.143c-0.009-0.026-26.778-74.991-50.244-140.732c-0.811-2.278-3.294-3.354-5.547-2.483 c-15.317,5.922-34.142,9.387-54.741,9.387c-20.557,0-39.339-3.456-54.639-9.353c-2.253-0.87-4.736,0.23-5.547,2.5l-50.185,140.536 c-0.324,0.913-0.495,1.886-0.495,2.867c0,17.596,26.539,25.6,51.2,25.6c3.234,0,6.187-1.826,7.637-4.719l0.896-1.801l0.247,0.503 c2.219,10.718,18.697,14.592,34.108,14.549c2.773-0.008,5.333-1.493,6.869-3.797l9.975-14.959l9.967,14.95 c1.536,2.304,4.096,3.789,6.869,3.797c15.42,0.043,31.898-3.831,34.108-14.549l0.256-0.495l0.896,1.801 c1.451,2.893,4.403,4.719,7.637,4.719c24.303,0,50.389-7.799,51.132-24.875C366.907,478.463,366.796,476.022,366.498,475.143z"
												></path>
											</g>
										</g>
									</g>
								</svg>
							</button>
						</li>
						<li>
							<!-- Remove Isolated-->
							<button type="button" class="bg-none border-none p-1" @click="removeIsolatedNodes()">
								<svg class="hover:fill-sky-300" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g>
										<path d="M15.59 12.26C18.4232 12.26 20.72 9.96323 20.72 7.13C20.72 4.29678 18.4232 2 15.59 2C12.7567 2 10.46 4.29678 10.46 7.13C10.46 9.96323 12.7567 12.26 15.59 12.26Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"></path>
										<path
											d="M6.36002 19.44C8.06105 19.44 9.44003 18.0611 9.44003 16.36C9.44003 14.659 8.06105 13.28 6.36002 13.28C4.65898 13.28 3.28003 14.659 3.28003 16.36C3.28003 18.0611 4.65898 19.44 6.36002 19.44Z"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-miterlimit="10"
										></path>
										<path
											fill="currentColor"
											d="M16.62 22C18.0338 22 19.18 20.8539 19.18 19.44C19.18 18.0262 18.0338 16.88 16.62 16.88C15.2061 16.88 14.06 18.0262 14.06 19.44C14.06 20.8539 15.2061 22 16.62 22Z"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-miterlimit="10"
										></path>
									</g>
								</svg>
							</button>
						</li>
					</ul>
				</div>
				<!-- Search Input -->
				<div class="border-r-2 border-primary pt-0 pr-2" v-if="isSearchVisible">
					<form class="absolute inset-x-0 top-1/2 z-10 mx-4 hidden -translate-y-1/2 sm:relative sm:top-0 sm:mx-0 sm:block sm:translate-y-0" :class="{ '!block': search }" @submit.prevent="true">
						<!--Search input-->
						<div class="relative">
							<input type="text" v-model="searchTerm" class="peer form-input placeholder:tracking-widest ltr:pl-9 ltr:pr-9 rtl:pl-9 rtl:pr-9 sm:bg-transparent ltr:sm:pr-4 rtl:sm:pl-4" placeholder="Database search" @keydown.enter="search()" />
							<button type="button" class="absolute inset-0 h-9 w-9 appearance-none peer-focus:text-primary ltr:right-auto rtl:left-auto">
								<svg class="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
									<path d="M18.5 18.5L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
								</svg>
							</button>
						</div>
					</form>
				</div>
				<!-- View Section -->
				<div class="border-r-2 border-primary pt-3 pr-2" v-if="isViewSectionVisible">
					<div class="absolute top-0 pl-1.5 z-20 dark:text-neutral-500 text-xs">View</div>
					<ul class="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#a1a1aa]">
						<li>
							<!-- Zoom In  -->
							<button type="button" class="bg-none border-none p-1" @click="zoomIn()">
								<svg class="hover:fill-sky-300" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g>
										<path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
										<path d="M20.9992 21L14.9492 14.95" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
										<path d="M6 10H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
										<path d="M10 6V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
									</g>
								</svg>
							</button>
						</li>
						<li>
							<!-- Zoom Out  -->
							<button type="button" class="bg-none border-none p-1" @click="zoomOut()">
								<svg class="hover:fill-sky-300" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g>
										<path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
										<path d="M20.9992 21L14.9492 14.95" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
										<path d="M6 10H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
									</g>
								</svg>
							</button>
						</li>
						<li>
							<!-- Zoom Fit  -->
							<button type="button" class="bg-none border-none p-1" @click="fit()" title="Fit the diagram (CTRL+V)">
								<svg width="24px" height="24px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
									<g class="hover:stroke-sky-300" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
										<g transform="translate(-152.000000, -983.000000)" fill="currentColor">
											<path
												d="M176.972,989 L172,989 C171.448,989 171,989.448 171,990 C171,990.553 171.448,991 172,991 L174.628,991 L169.83,995.799 L171.244,997.213 L176.022,992.435 L176,995 C176,995.553 176.448,996 177,996 C177.552,996 178,995.553 178,995 L178,990 C178,989.704 177.877,989.465 177.684,989.301 C177.502,989.115 177.251,989 176.972,989 L176.972,989 Z M182,1011 C182,1012.1 181.104,1013 180,1013 L156,1013 C154.896,1013 154,1012.1 154,1011 L154,987 C154,985.896 154.896,985 156,985 L180,985 C181.104,985 182,985.896 182,987 L182,1011 L182,1011 Z M180,983 L156,983 C153.791,983 152,984.791 152,987 L152,1011 C152,1013.21 153.791,1015 156,1015 L180,1015 C182.209,1015 184,1013.21 184,1011 L184,987 C184,984.791 182.209,983 180,983 L180,983 Z M164.756,1000.79 L159.978,1005.57 L160,1003 C160,1002.45 159.552,1002 159,1002 C158.448,1002 158,1002.45 158,1003 L158,1008 C158,1008.3 158.123,1008.54 158.316,1008.7 C158.497,1008.88 158.749,1009 159.028,1009 L164,1009 C164.552,1009 165,1008.55 165,1008 C165,1007.45 164.552,1007 164,1007 L161.372,1007 L166.17,1002.2 L164.756,1000.79 L164.756,1000.79 Z M177,1002 C176.448,1002 176,1002.45 176,1003 L176.022,1005.57 L171.244,1000.79 L169.83,1002.2 L174.628,1007 L172,1007 C171.448,1007 171,1007.45 171,1008 C171,1008.55 171.448,1009 172,1009 L176.972,1009 C177.251,1009 177.503,1008.88 177.684,1008.7 C177.877,1008.54 178,1008.3 178,1008 L178,1003 C178,1002.45 177.552,1002 177,1002 L177,1002 Z M164,991 C164.552,991 165,990.553 165,990 C165,989.448 164.552,989 164,989 L159.028,989 C158.749,989 158.498,989.115 158.316,989.301 C158.123,989.465 158,989.704 158,990 L158,995 C158,995.553 158.448,996 159,996 C159.552,996 160,995.553 160,995 L159.978,992.435 L164.756,997.213 L166.17,995.799 L161.372,991 L164,991 L164,991 Z"
											></path>
										</g>
									</g>
								</svg>
							</button>
						</li>
					</ul>
				</div>
				<!-- Layout Section -->
				<div class="border-r-2 border-primary pt-3 pr-2" v-if="isLayoutSectionVisible">
					<div class="absolute top-0 pl-1.5 z-20 dark:text-neutral-500 text-xs">Layout</div>
					<ul class="flex items-center space-x-2 dark:text-[#a1a1aa]">
						<li>
							<!-- Organic Layout-->
							<button type="button" class="bg-none border-none p-1" title="Organic Layout (CTRL+L)" @click="layout('organic')">
								<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 40 40">
									<g class="layer">
										<circle cx="6.34975" cy="28.14941" fill="currentColor" id="svg_1" r="3.63898" stroke="currentColor" transform="matrix(1 0 0 1 0 0)" />
										<circle cx="19.6944" cy="33.49745" fill="currentColor" id="svg_2" r="3.63898" stroke="currentColor" transform="matrix(1 0 0 1 0 0)" />
										<circle cx="31.17148" cy="14.14262" fill="currentColor" id="svg_3" r="3.63898" stroke="currentColor" />
										<circle cx="32.7674" cy="32.47878" fill="currentColor" id="svg_4" r="3.63898" stroke="currentColor" />
										<circle cx="8.72666" cy="9.93209" fill="currentColor" id="svg_6" r="3.63898" stroke="currentColor" transform="matrix(1 0 0 1 0 0)" />
										<circle cx="20.88285" cy="20.73005" fill="currentColor" id="svg_7" r="3.63898" stroke="currentColor" transform="matrix(1 0 0 1 0 0)" />
										<line fill="none" id="svg_8" stroke="currentColor" x1="20.61121" x2="20.03396" y1="22.81834" y2="31.37521" />
										<line fill="none" id="svg_9" stroke="currentColor" x1="23.36163" x2="30.96774" y1="22.81834" y2="30.83192" />
										<line fill="none" id="svg_10" stroke="currentColor" x1="10.83192" x2="20.57725" y1="11.98642" y2="20.78098" />
										<line fill="none" id="svg_13" stroke="currentColor" x1="30.28862" x2="22.88625" y1="14.4652" y2="19.21902" />
										<line fill="none" id="svg_15" stroke="currentColor" x1="9.57555" x2="18.03056" y1="29.71138" y2="33.27674" />
										<line fill="none" id="svg_16" stroke="currentColor" x1="18.47199" x2="7.40238" y1="21.59593" y2="26.96095" />
									</g>
								</svg>
							</button>
						</li>
						<li>
							<!-- Hierarchic Layout-->
							<button type="button" class="bg-none border-none p-1" title="Hierarchic Layout (CTRL+H)" @click="layout('hierarchical')">
								<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 40 40">
									<g class="layer">
										<circle cx="7.19864" cy="33.44652" fill="currentColor" id="svg_1" r="3.63898" stroke="currentColor" />
										<circle cx="19.6944" cy="33.49745" fill="currentColor" id="svg_2" r="3.63898" stroke="currentColor" />
										<circle cx="33.54839" cy="33.63328" fill="currentColor" id="svg_4" r="3.63898" stroke="currentColor" />
										<circle cx="19.6944" cy="9.72835" fill="currentColor" id="svg_6" r="3.63898" stroke="currentColor" transform="matrix(1 0 0 1 0 0)" />
										<circle cx="19.6944" cy="20.73005" fill="currentColor" id="svg_7" r="3.63898" stroke="currentColor" transform="matrix(1 0 0 1 0 0)" />
										<line fill="none" id="svg_17" stroke="currentColor" x1="19.55857" x2="19.55857" y1="12.63158" y2="18.47554" />
										<line fill="none" id="svg_18" stroke="currentColor" x1="19.89813" x2="19.89813" y1="23.93888" y2="31.07357" />
										<line fill="none" id="svg_20" stroke="currentColor" x1="18.30221" x2="8.6927" y1="21.73175" y2="31.37521" />
										<line fill="none" id="svg_21" stroke="currentColor" x1="21.08659" x2="32.42784" y1="21.59593" y2="32.73345" />
									</g>
								</svg>
							</button>
						</li>
						<li>
							<!-- Concentric Layout-->
							<button type="button" class="bg-none border-none p-1" title="Concentric Layout (CTRL+O)" @click="layout('concentric')">
								<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 40 40">
									<g class="layer">
										<circle cx="9.26995" cy="33.78608" fill="currentColor" id="svg_1" r="3.63898" stroke="currentColor" transform="matrix(1 0 0 1 0 0)" />
										<circle cx="7.26655" cy="21.68082" fill="currentColor" id="svg_2" r="3.63898" stroke="currentColor" />
										<circle cx="22.71647" cy="5.28014" fill="currentColor" id="svg_4" r="3.63898" stroke="currentColor" transform="matrix(1 0 0 1 0 0)" />
										<circle cx="12.1562" cy="11.08659" fill="currentColor" id="svg_6" r="3.63898" stroke="currentColor" transform="matrix(1 0 0 1 0 0)" />
										<circle cx="29.37182" cy="27.48727" fill="currentColor" id="svg_7" r="3.63898" stroke="currentColor" transform="matrix(1 0 0 1 0 0)" />
										<circle cx="16.62139" cy="27.04584" fill="currentColor" id="svg_24" r="2.28075" stroke="currentColor" />
										<circle cx="18.31918" cy="19.76231" fill="currentColor" id="svg_25" r="2.28075" stroke="currentColor" />
										<circle cx="24.60102" cy="15.21222" fill="currentColor" id="svg_26" r="2.28075" stroke="currentColor" transform="matrix(1 0 0 1 0 0)" />
										<line fill="none" id="svg_27" stroke="currentColor" x1="10.59423" x2="15.28014" y1="32.02037" y2="28.04754" />
										<line fill="none" id="svg_28" stroke="currentColor" x1="20.27165" x2="28.55688" y1="21.32428" y2="26.85908" />
										<line fill="none" id="svg_29" stroke="currentColor" x1="25.33107" x2="28.93039" y1="16.84211" y2="25.29711" />
										<line fill="none" id="svg_30" stroke="currentColor" x1="10.1528" x2="15.24618" y1="23.05603" y2="26.24788" />
										<line fill="none" id="svg_31" stroke="currentColor" x1="14.39728" x2="23.42954" y1="12.1562" y2="15.0764" />
										<line fill="none" id="svg_32" stroke="currentColor" x1="23.53141" x2="24.38031" y1="6.41766" y2="14.29542" />
										<line fill="none" id="svg_33" stroke="currentColor" x1="18.37012" x2="28.28523" y1="27.47029" y2="27.40238" />
									</g>
								</svg>
							</button>
						</li>
					</ul>
				</div>

				<!-- Edit Section -->
				<div class="border-r-2 border-primary pt-3 pr-2" v-if="isEditSectionVisible">
					<div class="absolute top-0 pl-0 z-20 dark:text-neutral-500 text-xs">Edit</div>
					<ul class="flex items-center space-x-2 dark:text-[#a1a1aa]">
						<li>
							<!-- Pointer-->
							<button type="button" :class="{ enabledSectionButton: interactionMode === 'universal', disabledSectionButton: interactionMode !== 'universal' }" title="Create edges" @click="setInteractionMode('universal')">
								<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M3.3572 3.23397C3.66645 2.97447 4.1014 2.92638 4.45988 3.11204L20.7851 11.567C21.1426 11.7522 21.3542 12.1337 21.322 12.5351C21.2898 12.9364 21.02 13.2793 20.6375 13.405L13.7827 15.6586L10.373 22.0179C10.1828 22.3728 9.79826 22.5789 9.39743 22.541C8.9966 22.503 8.65762 22.2284 8.53735 21.8441L3.04564 4.29872C2.92505 3.91345 3.04794 3.49346 3.3572 3.23397ZM5.67123 5.99173L9.73507 18.9752L12.2091 14.361C12.3304 14.1347 12.5341 13.9637 12.7781 13.8835L17.7518 12.2484L5.67123 5.99173Z"
											fill="currentColor"
										></path>
									</g>
								</svg>
							</button>
						</li>
						<li>
							<!-- Create Edges-->
							<button type="button" :class="{ enabledSectionButton: interactionMode === 'edgeCreation', disabledSectionButton: interactionMode !== 'edgeCreation' }" title="Create edges" @click="setInteractionMode('edgeCreation')">
								<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
									<g class="layer">
										<line fill="none" id="svg_4" stroke="currentColor" x1="6.86" x2="18.16" y1="16.56" y2="5.6" />
										<circle cx="5.78" cy="18.26" fill="currentColor" id="svg_1" r="3.66" stroke="#000000" stroke-opacity="0" />
										<circle cx="17.89" cy="5.8" fill="currentColor" id="svg_2" r="3.66" stroke="#000000" stroke-opacity="0" />
										<path d="m14.3,16.36l2.45,0l0,-2.72l2.31,0l0,2.72l2.45,0l0,2.56l-2.45,0l0,2.72l-2.31,0l0,-2.72l-2.45,0z" fill="currentColor" id="svg_5" stroke="currentColor" stroke-width="0" />
									</g>
								</svg>
							</button>
						</li>
						<li>
							<!-- Create Nodes-->
							<button type="button" :class="{ enabledSectionButton: interactionMode === 'nodeCreation', disabledSectionButton: interactionMode !== 'nodeCreation' }" title="Create nodes" @click="setInteractionMode('nodeCreation')">
								<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
									<g class="layer">
										<circle cx="8.54" cy="8.62" fill="currentColor" r="5.38" stroke="#000000" stroke-opacity="0" />
										<path d="m14.3,16.36l2.45,0l0,-2.72l2.31,0l0,2.72l2.45,0l0,2.56l-2.45,0l0,2.72l-2.31,0l0,-2.72l-2.45,0z" fill="currentColor" id="svg_5" stroke="#dd1818" stroke-width="0" transform="matrix(1 0 0 1 0 0)" />
									</g>
								</svg>
							</button>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<!--Toggle Right -->
				<button class="mr-5 mt-3" @click="toggleRight()" v-if="isPropertiesIconVisible">
					<svg fill="currentColor" width="24px" height="24px" viewBox="0 0 36 36" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
						<g>
							<path class="clr-i-outline clr-i-outline-path-1" d="M16.08,14.9a10.41,10.41,0,0,1,1.87-.71l-4-10.77a2,2,0,0,0-3.75,0L2,25.26A2,2,0,0,0,3.92,28h6.94a10,10,0,0,1-.52-2H3.92L12.06,4.12Z"></path>
							<path class="clr-i-outline clr-i-outline-path-2" d="M32,9H22a2,2,0,0,0-2,2v2.85c.23,0,.46,0,.69,0A10.51,10.51,0,0,1,22,13.9V11H32V21H30.65a10.42,10.42,0,0,1,.45,2H32a2,2,0,0,0,2-2V11A2,2,0,0,0,32,9Z"></path>
							<path class="clr-i-outline clr-i-outline-path-3" d="M20.69,15.81a8.5,8.5,0,1,0,8.5,8.5A8.51,8.51,0,0,0,20.69,15.81Zm0,15a6.5,6.5,0,1,1,6.5-6.5A6.51,6.51,0,0,1,20.69,30.81Z"></path>
							<rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect>
						</g>
					</svg>
				</button>
			</div>
		</div>
	</div>
	<splitpanes class="!h-[85vh] overflow-hidden" :push-other-panes="false">
		<pane size="20" v-if="isLeftVisible" class="">
			<!-- Left Panel-->
			<div class="border-r border-white-light dark:border-primary !h-[95vh]">
				<!--Toggle Left -->
				<svg class="float-right m-1 h-[13px] w-[13px] cursor-pointer text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" @click="toggleLeft()">
					<path stroke="currentColor" opacity="0.6" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
				</svg>
				<TabGroup as="div" class="mx-2 mb-5 mt-1">
					<TabList class="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
						<Tab as="template" v-slot="{ selected }">
							<a
								href="javascript:"
								class="-mb-[1px] block border border-transparent p-3.5 py-2 !outline-none transition duration-300 hover:text-primary dark:hover:border-b-black"
								:class="{ '!border-white-light !border-b-white  text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
								>Categories</a
							>
						</Tab>
						<Tab as="template" v-slot="{ selected }">
							<div
								class="-mb-[1px] block cursor-pointer border border-transparent p-3.5 py-2 !outline-none transition duration-300 hover:text-primary dark:hover:border-b-black"
								:class="{ '!border-white-light !border-b-white text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
							>
								Relationships
							</div>
						</Tab>

						<Tab as="template" disabled>
							<a href="javascript:" class="pointer-events-none -mb-[1px] block p-3.5 py-2 text-white-light dark:text-dark">Saved Cypher</a>
						</Tab>
					</TabList>
					<TabPanels class="flex-1 pt-5 text-sm">
						<TabPanel>
							<div class="columns-2">
								<div class="flex">
									<svg class="h-[19px] w-[19px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.9" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
									</svg>
									<span class="ml-2">Add category</span>
								</div>
								<div class="float-right mr-2">
									<svg v-tippy:info class="h-[19px] w-[19px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.9" d="M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
									</svg>
									<tippy target="info" trigger="mouseenter" placement="top">Popover on info</tippy>
								</div>
							</div>
							<div v-for="i in 10" class="my-3 rounded-md border border-gray-300 p-4">
								<span class="badge bg-emerald-600">Category {{ i }}</span>
								<span class="float-right">1 label</span>
							</div>
						</TabPanel>
						<TabPanel>
							<div class="flex items-start">
								<div class="h-20 w-20 flex-none ltr:mr-4 rtl:ml-4">
									<img src="/images/anonymous.png" alt="" class="m-0 h-20 w-20 rounded-full object-cover ring-2 ring-[#ebedf2] dark:ring-white-dark" />
								</div>
								<div class="flex-auto">
									<h5 class="mb-4 text-xl font-medium">Media heading</h5>
									<p class="text-white-dark">Change</p>
								</div>
							</div>
						</TabPanel>
						<TabPanel>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
						</TabPanel>
						<TabPanel>Disabled</TabPanel>
					</TabPanels>
				</TabGroup>
			</div>
		</pane>
		<pane size="60">
			<splitpanes horizontal>
				<pane size="10" v-if="isTopVisible">
					<div>
						<svg class="float-right m-1 h-[13px] w-[13px] cursor-pointer text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" @click="isTopVisible = !isTopVisible">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
						</svg>
					</div>
				</pane>
				<pane size="70">
					<!-- Main Content-->
					<graphviz-viewer ref="viewerControl" @selection-changed="onSelectionChanged" @double-click="augmentNode"></graphviz-viewer>
					<div v-if="showSpinner" class="absolute inset-0 flex justify-center items-center z-10">
						<spinner></spinner>
					</div>
				</pane>
				<pane size="20" v-if="isBottomVisible">
					<div>
						<svg class="float-right m-1 h-[13px] w-[13px] cursor-pointer text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" @click="isBottomVisible = !isBottomVisible">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
						</svg>
						Bottom
					</div>
				</pane>
			</splitpanes>
		</pane>
		<pane size="20" v-if="isRightVisible">
			<!--Right Panel -->
			<div class="border-l border-white-light dark:border-primary !h-[95vh]">
				<!--Toggle Right -->
				<svg title="Close this panel" class="float-right m-1 h-[13px] w-[13px] cursor-pointer text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" @click="toggleRight()">
					<path stroke="currentColor" opacity="0.6" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
				</svg>
				<div class="m-1 justify-center">
					<TabGroup as="div" class="mx-2 mb-5 mt-1">
						<TabList class="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
							<Tab as="template" v-slot="{ selected }">
								<a
									href="javascript:"
									class="-mb-[1px] block border border-transparent p-3.5 py-2 !outline-none transition duration-300 hover:text-primary dark:hover:border-b-black"
									:class="{ '!border-white-light !border-b-white  text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
									>Properties</a
								>
							</Tab>
							<Tab as="template" v-slot="{ selected }">
								<div
									class="-mb-[1px] block cursor-pointer border border-transparent p-3.5 py-2 !outline-none transition duration-300 hover:text-primary dark:hover:border-b-black"
									:class="{ '!border-white-light !border-b-white text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
								>
									Style
								</div>
							</Tab>
							<Tab as="template" v-slot="{ selected }">
								<div
									class="-mb-[1px] block cursor-pointer border border-transparent p-3.5 py-2 !outline-none transition duration-300 hover:text-primary dark:hover:border-b-black"
									:class="{ '!border-white-light !border-b-white text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
								>
									Shortcuts
								</div>
							</Tab>
						</TabList>
						<TabPanels class="pt-3 text-sm">
							<!-- Properties-->
							<TabPanel>
								<div class="">
									<div class="my-2 flex">
										<button v-if="hasProperties" class="btn btn-primary h-2 mr-2" @click="centerNode()">Center Node</button>
										<button v-if="hasProperties" class="btn btn-primary h-2" @click="editProperties()">Edit</button>
										<button v-if="hasProperties" class="ml-3 translate-y-[-3px]" @click="deleteNode()">
											<svg fill="darkred" width="20px" height="24px" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
												<g>
													<path
														d="M 15.7566 49.5476 L 40.2434 49.5476 C 44.8420 49.5476 46.8962 47.4001 47.5731 42.8248 L 51.0511 19.4118 L 51.5645 19.4118 C 54.4358 19.4118 56 17.6144 56 14.7665 L 56 11.2183 C 56 8.3705 54.4358 6.5731 51.5645 6.5731 L 4.4352 6.5731 C 1.7040 6.5731 0 8.3705 0 11.2183 L 0 14.7665 C 0 17.6144 1.5640 19.4118 4.4352 19.4118 L 4.9721 19.4118 L 8.4268 42.8248 C 9.1271 47.4234 11.1579 49.5476 15.7566 49.5476 Z M 5.3922 15.8870 C 4.2251 15.8870 3.7582 15.3968 3.7582 14.2296 L 3.7582 11.7553 C 3.7582 10.5881 4.2251 10.0979 5.3922 10.0979 L 50.6308 10.0979 C 51.7983 10.0979 52.2419 10.5881 52.2419 11.7553 L 52.2419 14.2296 C 52.2419 15.3968 51.7983 15.8870 50.6308 15.8870 Z M 15.8032 46.0228 C 13.7024 46.0228 12.5118 45.0891 12.1617 42.7782 L 8.6836 19.4118 L 47.3164 19.4118 L 43.8380 42.7782 C 43.5115 45.0891 42.2743 46.0228 40.1967 46.0228 Z M 21.2188 41.1441 C 21.7090 41.1441 22.1292 40.9107 22.4560 40.5839 L 27.9883 35.0516 L 33.5206 40.5839 C 33.8474 40.8874 34.2676 41.1441 34.7811 41.1441 C 35.7615 41.1441 36.5552 40.3038 36.5552 39.3234 C 36.5552 38.7865 36.3451 38.4130 36.0183 38.0629 L 30.5093 32.5539 L 36.0416 26.9749 C 36.3918 26.6014 36.5785 26.2513 36.5785 25.7611 C 36.5785 24.7573 35.7849 23.9637 34.7811 23.9637 C 34.3376 23.9637 33.9408 24.1504 33.5673 24.5239 L 27.9883 30.0562 L 22.4326 24.5472 C 22.0825 24.1971 21.7090 24.0104 21.2188 24.0104 C 20.2384 24.0104 19.4214 24.7807 19.4214 25.7611 C 19.4214 26.2746 19.6315 26.6715 19.9583 26.9983 L 25.4673 32.5539 L 19.9583 38.0862 C 19.6315 38.4130 19.4214 38.8098 19.4214 39.3234 C 19.4214 40.3038 20.2150 41.1441 21.2188 41.1441 Z"
													></path>
												</g>
											</svg>
										</button>
										<div v-if="!hasProperties">Nothing selected</div>
									</div>
									<hr class="w-full h-[1px] mx-auto my-4 bg-primary-dark-light border-0 rounded dark:bg-primary" />
									<div class="mt-4 w-full">
										<div v-if="hasProperties">
											<div v-if="editPropertiesEnabled">
												<button class="flex" @click="addProperty()">
													<svg class="h-[19px] w-[19px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
														<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.9" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
													</svg>
													<span class="ml-2">Add property</span>
												</button>
												<div class="flex items-start my-2" v-for="(value, key) in propNode">
													<div class="w-[60px] mr-3">{{ key }}:</div>
													<div>
														<div v-if="key === 'id'">{{ value }}</div>
														<input
															v-else
															type="email"
															id="email"
															class="h-3 bg-primary-light border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-primary-dark-light dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
															placeholder=""
															v-model="propNode[key]"
														/>
													</div>
													<svg v-if="key !== 'id'" title="Delete this property" class="ml-5 h-[13px] w-[13px] cursor-pointer text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" @click="deleteProperty(key)">
														<path stroke="currentColor" opacity="0.6" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
													</svg>
												</div>
												<div class="my-2 flex justify-end">
													<button class="h-2 mr-2" @click="cancelEdit()">Cancel</button>
													<button class="btn btn-success h-2" @click="saveEdit()">Save</button>
												</div>
											</div>

											<div v-else class="my-2" v-for="(value, name, index) in propNode">
												<div class="flex items-start">
													<div class="w-[60px] mr-3">{{ name }}:</div>
													<div>
														{{ value }}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
							<TabPanel>
								<div class="flex items-start">
									<div class="flex-auto">
										<h5 class="mb-4 text-xl font-medium">Change Graph Theme</h5>
										<div class="border border-primary rounded p-3 cursor-pointer my-2" @click="setStyle('Schema')">
											<h2>Schema</h2>
										</div>
										<div class="border border-primary rounded p-3 cursor-pointer my-2" @click="setStyle('Default')">
											<h2>Default</h2>
										</div>
									</div>
								</div>
							</TabPanel>
							<TabPanel>
								<div class="">
									<div class="flex flex-grow">
										<div class="w-[80px] font-bold">CTRL V</div>
										<div>Fit diagram</div>
									</div>
									<div class="flex flex-grow">
										<div class="w-[80px] font-bold">CTRL L</div>
										<div>Layout</div>
									</div>
									<div class="flex flex-grow">
										<div class="w-[80px] font-bold">CTRL I</div>
										<div>Add node where pointer is</div>
									</div>
									<div class="flex flex-grow">
										<div class="w-[80px] font-bold">DELETE</div>
										<div>Remove selection</div>
									</div>
								</div>
							</TabPanel>
						</TabPanels>
					</TabGroup>
				</div>
			</div>
		</pane>
	</splitpanes>
</template>
<script setup lang="ts">
	import { Pane, Splitpanes } from "splitpanes";
	import "splitpanes/dist/splitpanes.css";
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
	import { GraphStyle } from "~/utils/enums";
	import { Notifications, Toasts } from "~/composables/notifications";
	import { useAppStore } from "~/stores";
	import GraphAPI from "~/utils/GraphAPI";
	import { CytoUtils, DataGenerator, Graph } from "~/utils";
	import { has } from "node-emoji";

	const searchTerm = ref("");
	let isExploreSectionVisible = ref(true);
	let isSearchVisible = ref(true);
	let isViewSectionVisible = ref(true);
	let isLayoutSectionVisible = ref(true);
	let isLeftVisible = ref(false);
	let isEditSectionVisible = ref(true);
	let isRightVisible = ref(true);
	let isHamburgerIconVisible = ref(true);
	let isPropertiesIconVisible = ref(true);
	let isTopVisible = ref(false);
	let isBottomVisible = ref(false);
	let viewer: IGraphViewer;
	let viewerControl = ref(null);
	let showSpinner = ref(false);
	let propNode = ref<any>(null);
	let currentNodeId = ref<string | null>(null);
	let editPropertiesEnabled = ref<boolean>(false);
	let hasProperties = ref<boolean>(false);
	let interactionMode = ref("universal");
	let currentPerspective = ref("explorer");

	const store = useAppStore();
	definePageMeta({
		layout: "default",
	});

	useHead({
		title: "Graph Explorer",
	});
	onMounted(() => {
		viewer = <IGraphViewer>(<unknown>viewerControl.value);
		setTimeout(() => {
			generateSampleGraph();
		}, 200);
	});
	// useKeyPressHandler(shortcuts);
	useKeyDownHandler(shortcuts);

	/**
	 * See {@link IGraphViewer}
	 * @param layoutName {string} The name of the layout.
	 */
	function layout(layoutName = "organic") {
		viewer.layout(layoutName);
	}

	function editProperties() {
		editPropertiesEnabled.value = true;
	}

	function cancelEdit() {
		editPropertiesEnabled.value = false;
	}

	function saveEdit() {
		setTimeout(() => {
			viewer.refreshStyle();
		}, 200);
		editPropertiesEnabled.value = false;
	}

	function shortcuts(e) {
		// no editing of the schema
		if (currentPerspective.value === "schema") {
			return;
		}
		console.log("Key:", e.key);
		if (e.metaKey || e.ctrlKey) {
			switch (e.key) {
				case "l":
					return layout();
				case "i":
					return addNode(viewer.getPosition());
				case "v":
					return fit();
				case "g":
					return generateSampleGraph();
				case "h":
					return layout("hierarchical");
				case "o":
					return layout("concentric");
			}
		} else {
			switch (e.key) {
				case "Delete":
					return removeSelection();
			}
		}
	}

	function removeSelection() {
		viewer.removeSelection();
		hasProperties.value = false;
		propNode.value = null;
	}

	function deleteNode() {
		removeSelection();
	}

	/**
	 * See {@link IGraphViewer}
	 */
	function fit() {
		viewer.fit();
	}

	function zoomOut() {
		viewer.zoom(viewer.zoom() * 0.8);
	}

	function zoomIn() {
		viewer.zoom(viewer.zoom() * 1.2);
	}

	function removeIsolatedNodes() {
		viewer.removeIsolatedNodes();
		viewer.layout();
	}

	function generateSampleGraph() {
		const g = Graph.create("Erdos");
		g.nodes.forEach((n: any) => (n.name = DataGenerator.fullName()));
		viewer.loadGraph(g);
		viewer.setStyle(GraphStyle.Default);
	}

	function clearGraph() {
		viewer.clear();
	}

	/**
	 * Switches between panel layout and buttons available.
	 * @param name {string} The name of the perspective.
	 */
	function showPerspective(name = "explorer") {
		function showExplorer() {
			isLeftVisible.value = false;
			isRightVisible.value = false;
			isHamburgerIconVisible.value = true;
			isExploreSectionVisible.value = true;
			isSearchVisible.value = true;
			isViewSectionVisible.value = true;
			isLayoutSectionVisible.value = true;
			isPropertiesIconVisible.value = true;
			isEditSectionVisible.value = true;
			clearGraph();
		}

		function showSchema() {
			isLeftVisible.value = false;
			isRightVisible.value = false;
			isHamburgerIconVisible.value = false;
			isExploreSectionVisible.value = false;
			isSearchVisible.value = false;
			isViewSectionVisible.value = false;
			isLayoutSectionVisible.value = false;
			isPropertiesIconVisible.value = false;
			isEditSectionVisible.value = false;

			GraphAPI.getSchema().then((schema) => {
				if (schema) {
					if (schema.nodeCount === 0) {
						Toasts.info("The inferred schema is empty.");
					}
					viewer.loadGraph(schema);
					viewer.setStyle(GraphStyle.Schema);
				} else {
					Toasts.error("The schema could not be loaded.");
				}
			});
		}

		currentPerspective.value = name.toLowerCase();
		switch (name.toLowerCase()) {
			case "explorer":
				return showExplorer();
			case "schema":
				return showSchema();
		}
	}

	function setInteractionMode(mode: string = "universal") {
		switch (mode.toLowerCase()) {
			case "universal":
				return setUniversalMode();
			case "edgecreation":
				return setEdgeCreationMode();
			case "nodecreation":
				return setNodeCreationMode();
		}
	}

	function setEdgeCreationMode() {
		interactionMode.value = "edgeCreation";
		viewer.edgeCreation(true);
		viewer.nodeCreation(false);
	}

	function setNodeCreationMode() {
		interactionMode.value = "nodeCreation";
		viewer.edgeCreation(false);
		viewer.nodeCreation(true);
	}

	function setUniversalMode() {
		interactionMode.value = "universal";
		viewer.edgeCreation(false);
		viewer.nodeCreation(false);
	}

	function centerNode() {
		const nodes = viewer.selectedNodes();
		if (nodes && nodes.length > 0) {
			viewer.zoom(1.5);
			viewer.centerNode(nodes[0]);
		}
	}

	function onSelectionChanged(selection) {
		if (selection && selection.length > 0) {
			showProperties(selection[0]);
		} else {
			hasProperties.value = false;
		}
	}

	function showProperties(element) {
		if (element) {
			// todo: these methods are cy specific
			currentNodeId.value = element.id();
			propNode.value = element.data();
			hasProperties.value = true;
		} else {
			currentNodeId.value = null;
			hasProperties.value = false;
		}
	}

	function addNode(position: any = { x: 0, y: 0 }) {
		const node = {
			data: {
				name: DataGenerator.fullName(),
				x: position.x,
				y: position.y,
			},
			id: Utils.id(),
		};
		viewer.addNode(node);
	}

	function toggleLeft() {
		isLeftVisible.value = !isLeftVisible.value;
		viewer.forceResize();
	}

	function toggleRight() {
		isRightVisible.value = !isRightVisible.value;
		window.dispatchEvent(new Event("resize"));
		viewer.forceResize();
	}

	async function search() {
		const term = searchTerm.value;
		console.log("Searching:", term);
		if (!Utils.isEmpty(term)) {
			const nodes = await GraphAPI.searchNodes(term, ["name"], 10);
			if (nodes?.length === 0) {
				return await Toasts.info(`Nothing found containing '${term}'.`);
			}
			const g = new Graph({ nodes, edges: [] });
			// viewer.clear();
			// nodes?.forEach((n) => {
			// 	viewer.addNode({
			// 		id: n.id,
			// 		data: { name: n.name },
			// 	});
			// });
			// layout();
			viewer.loadGraph(g);
			searchTerm.value = "";
			await Toasts.info(`Found ${nodes?.length} nodes containing '${term}'.`);
		}
	}

	async function addProperty() {
		const propName = await Notifications.askForPropertyName();
		if (!Utils.isEmpty(propName)) {
			propNode.value[propName] = "";
		}
	}

	function deleteProperty(name: string) {
		if (Utils.isEmpty(name)) {
			return;
		}
		delete propNode.value[name];
	}

	function setStyle(name) {
		viewer.setStyle(name);
	}

	async function augmentNode(id) {
		const g = await GraphAPI.getNeighborhood(id);
		if (g && g.nodes.length > 0) {
			viewer.augment(g);
		} else {
			await Toasts.info("No additional nodes found.");
		}
	}
</script>
<style>
	.enabledSectionButton {
		@apply border-black border;
	}

	.disabledSectionButton {
		@apply border-none;
	}
</style>
