<template>
	<header class="z-40">
		<div class="shadow-sm">
			<div class="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-[#333333]">
				<div class="flex">
					<span class="align-middle text-2xl font-semibold transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline">Project 1</span>

					<!--Header icons-->
					<ul class="flex ml-6 items-center space-x-2 rtl:space-x-reverse dark:text-[#a1a1aa]">
						<li>
							<NuxtLink to="/" class="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
										stroke="currentColor"
										stroke-width="1.5"
									/>
									<path opacity="0.5" d="M7 4V2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
									<path opacity="0.5" d="M17 4V2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
									<path opacity="0.5" d="M2 9H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
								</svg>
							</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/" class="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										opacity="0.5"
										d="M22 10.5V12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2H13.5"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
									/>
									<path
										d="M17.3009 2.80624L16.652 3.45506L10.6872 9.41993C10.2832 9.82394 10.0812 10.0259 9.90743 10.2487C9.70249 10.5114 9.52679 10.7957 9.38344 11.0965C9.26191 11.3515 9.17157 11.6225 8.99089 12.1646L8.41242 13.9L8.03811 15.0229C7.9492 15.2897 8.01862 15.5837 8.21744 15.7826C8.41626 15.9814 8.71035 16.0508 8.97709 15.9619L10.1 15.5876L11.8354 15.0091C12.3775 14.8284 12.6485 14.7381 12.9035 14.6166C13.2043 14.4732 13.4886 14.2975 13.7513 14.0926C13.9741 13.9188 14.1761 13.7168 14.5801 13.3128L20.5449 7.34795L21.1938 6.69914C22.2687 5.62415 22.2687 3.88124 21.1938 2.80624C20.1188 1.73125 18.3759 1.73125 17.3009 2.80624Z"
										stroke="currentColor"
										stroke-width="1.5"
									/>
									<path opacity="0.5" d="M16.6522 3.45508C16.6522 3.45508 16.7333 4.83381 17.9499 6.05034C19.1664 7.26687 20.5451 7.34797 20.5451 7.34797M10.1002 15.5876L8.4126 13.9" stroke="currentColor" stroke-width="1.5" />
								</svg>
							</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/" class="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle r="3" transform="matrix(-1 0 0 1 19 5)" stroke="currentColor" stroke-width="1.5" />
									<path
										opacity="0.5"
										d="M14 2.20004C13.3538 2.06886 12.6849 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
									/>
								</svg>
							</NuxtLink>
						</li>
					</ul>
				</div>
				<div class="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#a1a1aa] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
					<div class="sm:ltr:mr-auto sm:rtl:ml-auto">
						<form class="absolute inset-x-0 top-1/2 z-10 mx-4 hidden -translate-y-1/2 sm:relative sm:top-0 sm:mx-0 sm:block sm:translate-y-0" :class="{ '!block': search }" @submit.prevent="search = false">
							<!--Search input-->
							<div class="hidden relative">
								<input type="text" class="peer form-input placeholder:tracking-widest ltr:pl-9 ltr:pr-9 rtl:pl-9 rtl:pr-9 sm:bg-transparent ltr:sm:pr-4 rtl:sm:pl-4" placeholder="Search..." />
								<button type="button" class="absolute inset-0 h-9 w-9 appearance-none peer-focus:text-primary ltr:right-auto rtl:left-auto">
									<svg class="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
										<path d="M18.5 18.5L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
									</svg>
								</button>
								<button type="button" class="absolute top-1/2 block -translate-y-1/2 hover:opacity-80 ltr:right-2 rtl:left-2 sm:hidden" @click="search = false">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
										<path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
									</svg>
								</button>
							</div>
						</form>

						<button type="button" class="search_btn rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 dark:bg-dark/40 dark:hover:bg-dark/60 sm:hidden" @click="search = !search">
							<svg class="mx-auto h-4.5 w-4.5 dark:text-[#a1a1aa]" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
								<path d="M18.5 18.5L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
							</svg>
						</button>
					</div>
					<!--Current graph library-->
					<div class="badge badge-outline-info mr-2 cursor-default font-bold cursor-pointer" title="The current graph visualization library" @click="navigate('cytoscape')">
						{{ store.graphlib }}
					</div>
					<!--Three themes-->
					<div>
						<a href="javascript:" v-show="store.theme === 'light'" class="flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60" @click="store.toggleTheme('dark')">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.5" />
								<path d="M12 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
								<path d="M12 20V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
								<path d="M4 12L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
								<path d="M22 12L20 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
								<path opacity="0.5" d="M19.7778 4.22266L17.5558 6.25424" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
								<path opacity="0.5" d="M4.22217 4.22266L6.44418 6.25424" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
								<path opacity="0.5" d="M6.44434 17.5557L4.22211 19.7779" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
								<path opacity="0.5" d="M19.7778 19.7773L17.5558 17.5551" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
							</svg>
						</a>
						<a href="javascript:" v-show="store.theme === 'dark'" class="flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60" @click="store.toggleTheme('system')">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z"
									fill="currentColor"
								/>
							</svg>
						</a>
						<a href="javascript:" v-show="store.theme === 'system'" class="flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60" @click="store.toggleTheme('light')">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M3 9C3 6.17157 3 4.75736 3.87868 3.87868C4.75736 3 6.17157 3 9 3H15C17.8284 3 19.2426 3 20.1213 3.87868C21 4.75736 21 6.17157 21 9V14C21 15.8856 21 16.8284 20.4142 17.4142C19.8284 18 18.8856 18 17 18H7C5.11438 18 4.17157 18 3.58579 17.4142C3 16.8284 3 15.8856 3 14V9Z"
									stroke="currentColor"
									stroke-width="1.5"
								/>
								<path opacity="0.5" d="M22 21H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
								<path opacity="0.5" d="M15 15H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
							</svg>
						</a>
					</div>

					<div class="dropdown shrink-0 hidden">
						<!--Language (locale) selection-->
						<client-only>
							<Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8">
								<button type="button" class="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60">
									<img :src="currentFlag" alt="flag" class="h-5 w-5 rounded-full object-cover" />
								</button>
								<template #content="{ close }">
									<ul class="grid w-[280px] grid-cols-2 gap-2 !px-2 font-semibold text-dark dark:text-white-dark dark:text-white-light/90" @click="close()">
										<template v-for="item in store.languageList" :key="item.code">
											<li>
												<button
													type="button"
													class="w-full hover:text-primary"
													:class="{
														'bg-primary/10 text-primary': store.locale === item?.code,
													}"
													@click="changeLanguage(item)"
												>
													<img class="h-5 w-5 rounded-full object-cover" :src="`/images/flags/${item.code.toUpperCase()}.svg`" alt="" />
													<span class="ltr:ml-3 rtl:mr-3">{{ item.name }}</span>
												</button>
											</li>
										</template>
									</ul>
								</template>
							</Popper>
						</client-only>
					</div>

					<div class="dropdown shrink-0 hidden">
						<!--Messages-->
						<client-only>
							<Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="8">
								<button type="button" class="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M22 10C22.0185 10.7271 22 11.0542 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H13"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
										/>
										<path d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
										<circle cx="19" cy="5" r="3" stroke="currentColor" stroke-width="1.5" />
									</svg>
								</button>
								<template #content="{ close }">
									<ul class="top-11 w-[300px] !py-0 text-xs text-dark dark:text-white-dark sm:w-[375px]">
										<li class="mb-5">
											<div class="relative overflow-hidden rounded-t-md !p-5 text-white">
												<div class="absolute inset-0 h-full w-full bg-dark/50 dark:bg-light bg-cover bg-center bg-no-repeat"></div>
												<h4 class="relative z-10 text-lg font-semibold">Messages</h4>
											</div>
										</li>
										<template v-for="msg in messages" :key="msg.id">
											<li>
												<div class="flex items-center px-5 py-3">
													<div v-html="msg.image"></div>
													<span class="px-3 dark:text-gray-500">
														<div class="text-sm font-semibold dark:text-white-light/90" v-text="msg.title"></div>
														<div v-text="msg.message"></div>
													</span>
													<span class="whitespace-pre rounded bg-white-dark/20 px-1 font-semibold text-dark/60 ltr:ml-auto ltr:mr-2 rtl:ml-2 rtl:mr-auto dark:text-white-dark" v-text="msg.time"></span>
													<button type="button" class="text-neutral-300 hover:text-danger" @click="removeMessage(msg.id)">
														<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
															<path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
														</svg>
													</button>
												</div>
											</li>
										</template>
										<template v-if="messages.length">
											<li class="mt-5 border-t border-white-light text-center dark:border-white/10">
												<div class="group flex cursor-pointer items-center justify-center px-5 py-4 font-semibold text-primary dark:text-gray-400" @click="close()">
													<span class="group-hover:underline ltr:mr-1 rtl:ml-1">VIEW ALL ACTIVITIES</span>

													<svg class="h-4 w-4 transition duration-300 group-hover:translate-x-1 ltr:ml-1 rtl:mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
													</svg>
												</div>
											</li>
										</template>
										<template v-if="!messages.length">
											<li class="mb-5">
												<div class="!grid min-h-[200px] place-content-center text-lg hover:!bg-transparent">
													<div class="mx-auto mb-4 rounded-full text-primary ring-4 ring-primary/30">
														<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path opacity="0.5" d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z" fill="currentColor" />
															<path d="M10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V11C10.75 11.4142 10.4142 11.75 10 11.75C9.58579 11.75 9.25 11.4142 9.25 11V5C9.25 4.58579 9.58579 4.25 10 4.25Z" fill="currentColor" />
															<path d="M10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z" fill="currentColor" />
														</svg>
													</div>
													No data available.
												</div>
											</li>
										</template>
									</ul>
								</template>
							</Popper>
						</client-only>
					</div>

					<div class="dropdown shrink-0 hidden">
						<!--Notifications-->
						<client-only>
							<Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8">
								<button type="button" class="relative block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z"
											stroke="currentColor"
											stroke-width="1.5"
										/>
										<path d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
										<path d="M12 6V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
									</svg>
									<!--Pulsating light-->
									<span class="absolute top-0 flex h-3 w-3 ltr:right-0 rtl:left-0">
										<span class="absolute -top-[3px] inline-flex h-full w-full animate-ping rounded-full bg-success/50 opacity-75 ltr:-left-[3px] rtl:-right-[3px]"></span>
										<span class="relative inline-flex h-[6px] w-[6px] rounded-full bg-success"></span>
									</span>
								</button>
								<template #content="{ close }">
									<ul class="w-[300px] divide-y !py-0 text-dark dark:divide-white/10 dark:text-white-dark sm:w-[350px]">
										<li>
											<div class="flex items-center justify-between px-4 py-2 font-semibold">
												<h4 class="text-lg">Notification</h4>
												<template v-if="notifications.length">
													<span class="badge bg-primary/80" v-text="notifications.length + 'New'"></span>
												</template>
											</div>
										</li>
										<template v-for="notification in notifications" :key="notification.id">
											<li class="dark:text-white-light/90">
												<div class="group flex items-center px-4 py-2">
													<div class="grid place-content-center rounded">
														<div class="relative h-12 w-12">
															<img class="h-12 w-12 rounded-full object-cover" :src="`/assets/images/${notification.profile}`" alt="" />
															<span class="absolute bottom-0 right-[6px] block h-2 w-2 rounded-full bg-success"></span>
														</div>
													</div>
													<div class="flex flex-auto ltr:pl-3 rtl:pr-3">
														<div class="ltr:pr-3 rtl:pl-3">
															<h6 v-html="notification.message"></h6>
															<span class="block text-xs font-normal dark:text-gray-500" v-text="notification.time"></span>
														</div>
														<button type="button" class="text-neutral-300 opacity-0 hover:text-danger group-hover:opacity-100 ltr:ml-auto rtl:mr-auto" @click="removeNotification(notification.id)">
															<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
																<path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
															</svg>
														</button>
													</div>
												</div>
											</li>
										</template>
										<template v-if="notifications.length">
											<li>
												<div class="p-4">
													<button class="btn btn-primary btn-small block w-full" @click="close()">Read All Notifications</button>
												</div>
											</li>
										</template>
										<template v-if="!notifications.length">
											<li>
												<div class="!grid min-h-[200px] place-content-center text-lg hover:!bg-transparent">
													<div class="mx-auto mb-4 rounded-full text-primary ring-4 ring-primary/30">
														<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path opacity="0.5" d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z" fill="currentColor" />
															<path d="M10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V11C10.75 11.4142 10.4142 11.75 10 11.75C9.58579 11.75 9.25 11.4142 9.25 11V5C9.25 4.58579 9.58579 4.25 10 4.25Z" fill="currentColor" />
															<path d="M10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z" fill="currentColor" />
														</svg>
													</div>
													No data available.
												</div>
											</li>
										</template>
									</ul>
								</template>
							</Popper>
						</client-only>
					</div>
					<!--Settings icon-->
					<button type="button" class="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60" @click="store.toggleAppSettings()">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="12" cy="12" r="3" stroke="#1C274C" stroke-width="1.5" />
							<path
								opacity="0.5"
								d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
								stroke="#1C274C"
								stroke-width="1.5"
							/>
						</svg>
					</button>

					<div class="dropdown shrink-0 hidden">
						<!--User-->
						<client-only>
							<Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8" class="!block">
								<button type="button" class="group relative block">
									<img class="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100" src="/images/swa.jpg" alt="" />
								</button>
								<template #content="{ close }">
									<ul class="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
										<li>
											<div class="flex items-center px-4 py-4">
												<div class="flex-none">
													<img class="h-10 w-10 rounded-md object-cover" src="/images/swa.jpg" alt="Francois Vanderseypen" />
												</div>
												<div class="truncate ltr:pl-4 rtl:pr-4">
													<h4 class="text-base">{{ store.user.nickname }}<span class="rounded bg-success-light px-1 text-xs text-success ltr:ml-2 rtl:ml-2">Pro</span></h4>
													<a class="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white" href="javascript:">{{ store.user.email }}</a>
												</div>
											</div>
										</li>
										<li>
											<NuxtLink to="/users/profile" class="dark:hover:text-white" @click="close()">
												<svg class="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<circle cx="12" cy="6" r="4" stroke="currentColor" stroke-width="1.5" />
													<path opacity="0.5" d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" stroke="currentColor" stroke-width="1.5" />
												</svg>

												Profile
											</NuxtLink>
										</li>
										<li>
											<NuxtLink to="/" class="dark:hover:text-white" @click="close()">
												<svg class="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path
														opacity="0.5"
														d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
														stroke="currentColor"
														stroke-width="1.5"
													/>
													<path d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
												</svg>

												Inbox
											</NuxtLink>
										</li>
										<li>
											<NuxtLink to="/auth/boxed-lockscreen" class="dark:hover:text-white" @click="close()">
												<svg class="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path
														d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"
														stroke="currentColor"
														stroke-width="1.5"
													/>
													<path opacity="0.5" d="M6 10V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
													<g opacity="0.5">
														<path d="M9 16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16Z" fill="currentColor" />
														<path d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z" fill="currentColor" />
														<path d="M17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z" fill="currentColor" />
													</g>
												</svg>

												Lock Screen
											</NuxtLink>
										</li>
										<li class="border-t border-white-light dark:border-white-light/10">
											<NuxtLink to="/auth/boxed-signin" class="!py-3 text-danger" @click="close()">
												<svg class="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2 rtl:ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path
														opacity="0.5"
														d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
													/>
													<path d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>

												Sign Out
											</NuxtLink>
										</li>
									</ul>
								</template>
							</Popper>
						</client-only>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script lang="ts" setup>
	import { ref, onMounted, computed, reactive, watch } from "vue";

	import appSetting from "@/app-setting";

	import { useRoute } from "vue-router";
	import { useAppStore } from "@/stores/index";
	const store = useAppStore();
	const route = useRoute();
	const search = ref(false);
	const { setLocale } = useI18n();

	// multi language
	const changeLanguage = (item: any) => {
		appSetting.toggleLanguage(item, setLocale);
	};
	const currentFlag = computed(() => {
		return `/images/flags/${store.locale?.toUpperCase()}.svg`;
	});

	const notifications = ref([
		{
			id: 1,
			profile: "/images/anonymous.png",
			message: '<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
			time: "45 min ago",
		},
		{
			id: 2,
			profile: "/images/anonymous.png",
			message: '<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
			time: "9h Ago",
		},
		{
			id: 3,
			profile: "/images/anonymous.png",
			message: '<strong class="text-sm mr-1">Anna Morgan</strong>Upload a file',
			time: "9h Ago",
		},
	]);

	const messages = ref([
		{
			id: 1,
			image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
			title: "Congratulations!",
			message: "Your OS has been updated.",
			time: "1hr",
		},
		{
			id: 2,
			image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
			title: "Did you know?",
			message: "You can switch between artboards.",
			time: "2hr",
		},
		{
			id: 3,
			image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
			title: "Something went wrong!",
			message: "Send Reposrt",
			time: "2days",
		},
		{
			id: 4,
			image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
			title: "Warning",
			message: "Your password strength is low.",
			time: "5days",
		},
	]);

	onMounted(() => {
		setActiveDropdown();
	});

	watch(route, (to, from) => {
		setActiveDropdown();
	});

	const setActiveDropdown = () => {
		const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
		if (selector) {
			selector.classList.add("active");
			const all: any = document.querySelectorAll("ul.horizontal-menu .nav-link.active");
			for (let i = 0; i < all.length; i++) {
				all[0]?.classList.remove("active");
			}
			const ul: any = selector.closest("ul.sub-menu");
			if (ul) {
				let ele: any = ul.closest("li.menu").querySelectorAll(".nav-link");
				if (ele) {
					ele = ele[0];
					setTimeout(() => {
						ele?.classList.add("active");
					});
				}
			}
		}
	};

	const removeNotification = (value: number) => {
		notifications.value = notifications.value.filter((d) => d.id !== value);
	};

	const removeMessage = (value: number) => {
		messages.value = messages.value.filter((d) => d.id !== value);
	};
</script>
