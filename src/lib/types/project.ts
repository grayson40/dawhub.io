interface Author {
	name: string;
	avatar: string;
	followers: number;
}

interface CommentAuthor {
	name: string;
	avatar: string;
	isVerified: boolean;
	isOP?: boolean;
}

interface Reply {
	id: number;
	author: CommentAuthor;
	content: string;
	timestamp: string;
	likes: number;
	isLiked: boolean;
}

interface Comment {
	id: number;
	author: CommentAuthor;
	content: string;
	timestamp: string;
	likes: number;
	isLiked: boolean;
	replies?: Reply[];
}

interface Comments {
	count: number;
	items: Comment[];
}

export interface VersionChange {
	type: 'added' | 'modified' | 'removed' | 'fixed';
	description: string;
}

export interface Version {
	version: string;
	date: string;
	author: {
		name: string;
		avatar: string;
	};
	changes: VersionChange[];
	isLatest: boolean;
}

export interface ProjectHistory {
	currentVersion: string;
	versions: Version[];
}

export interface Project {
	id: string;
	title: string;
	description: string;
	author: Author;
	genre: string;
	bpm: number;
	key: string;
	duration: string;
	audioUrl: string;
	files: {
		mainProject: { name: string; size: string };
		samples: { count: number; totalSize: string };
		stems: { count: number; size: string };
	};
	technicalInfo: {
		daw: string;
		dawVersion: string;
		size: string;
	};
	comments: Comments;
	history: ProjectHistory;
}
