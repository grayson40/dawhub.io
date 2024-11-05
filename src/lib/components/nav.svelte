<script lang="ts">
	import DashboardMainNav from './main-nav.svelte';
	import Search from './search.svelte';
	import * as DropdownMenu from './ui/dropdown-menu/';
	import Button from './ui/button/button.svelte';
	import {
		Plus,
		ChevronDown,
		FilePlus,
		FileUp,
		Building2,
		FolderOpenDot,
		BadgeAlert
	} from 'lucide-svelte';
	import UserNav from './user-nav.svelte';

	export let page: string;
</script>

<div class="border-b">
	<div class="flex h-16 items-center px-4">
		<DashboardMainNav {page} />
		<div class="ml-auto flex items-center space-x-4">
			<Search />
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Button variant="outline">
						<div class="flex space-x-2">
							<Plus size={18} color="#6B7280" />
							<ChevronDown size={18} color="#6B7280" />
						</div>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="p-2">
					<DropdownMenu.Group>
						<DropdownMenu.Item>
							<FilePlus size={18} color="#6B7280" class="mr-2" />
							New Repository
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<FileUp size={18} color="#6B7280" class="mr-2" />
							Import Repository
						</DropdownMenu.Item>
					</DropdownMenu.Group>
					<DropdownMenu.Separator class="my-2" />
					<DropdownMenu.Group>
						<DropdownMenu.Item>
							<Building2 size={18} color="#6B7280" class="mr-2" />
							New Organization
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<FolderOpenDot size={18} color="#6B7280" class="mr-2" />
							New Project
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
			<a href="/issues">
				<Button variant="outline" size="icon">
					<BadgeAlert size={18} color="#6B7280" />
				</Button>
			</a>
			<UserNav />
		</div>
	</div>
</div>
