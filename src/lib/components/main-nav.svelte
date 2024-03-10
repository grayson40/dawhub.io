<script lang="ts">
	import { cn } from "$lib/utils.js";
	import Button from "./ui/button/button.svelte";
	import { AlignJustify, Music, Home, BadgeAlert, FolderOpenDot, MessagesSquare } from "lucide-svelte";
	import * as Sheet from "$lib/components/ui/sheet/";
	import SidebarNav from "../../routes/settings/(components)/sidebar-nav.svelte";

	export let page: string;

	const sidebarNavItems = [
		{
			title: "Home",
			href: "/",
			icon: Home,
		},
		{
			title: "Issues",
			href: "/issues",
			icon: BadgeAlert,
		},
		{
			title: "Projects",
			href: "/projects",
			icon: FolderOpenDot,
		},
		{
			title: "Discussions",
			href: "/discussions",
			icon: MessagesSquare,
		},
	];
</script>

<Sheet.Root>
  <Sheet.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline" size="icon"><AlignJustify /></Button>
  </Sheet.Trigger>
	<Sheet.Content side="left">
		<Sheet.Header>
			<Sheet.Title><Music /></Sheet.Title>
		</Sheet.Header>
		<div class="mt-4"/>
		<SidebarNav items={sidebarNavItems}/>
	</Sheet.Content>
	<a href="/" class="ml-4">
		<Music />
	</a>
	<div class="ml-4">
		{page.charAt(0).toUpperCase() + page.slice(1)}
	</div>
</Sheet.Root>