import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	// This would normally fetch from API
	const project = {
		id: params.id,
		title: 'Summer Vibes Beat',
		description: 'A chill electronic beat perfect for summer vibes and relaxation.',
		author: {
			name: 'JohnDoe',
			avatar: '/api/placeholder/100/100',
			followers: 1234
		},
		genre: 'Electronic',
		bpm: 128,
		key: 'C Minor',
		duration: '3:45',
		audioUrl: '/audio/audio.mp3',
		files: {
			mainProject: {
				name: 'Summer_Vibes_Beat.als',
				size: '24.5 MB',
				format: 'Ableton Live Project',
				lastModified: '2024-03-14',
				downloadUrl: '/download/project'
			},
			samples: {
				count: 45,
				totalSize: '1.8 GB',
				categories: {
					drums: {
						name: 'Drums',
						count: 12,
						size: '850 MB',
						files: [
							{
								name: 'kick_01.wav',
								size: '2.4 MB',
								type: 'audio/wav',
								lastModified: '2024-03-14',
								downloadUrl: '/download/samples/drums/kick_01.wav',
								previewAvailable: true
							},
							{
								name: 'snare_01.wav',
								size: '1.8 MB',
								type: 'audio/wav',
								lastModified: '2024-03-14',
								downloadUrl: '/download/samples/drums/snare_01.wav',
								previewAvailable: true
							}
						]
					},
					bass: {
						name: 'Bass',
						count: 8,
						size: '450 MB',
						files: [
							{
								name: 'bass_sub.wav',
								size: '4.2 MB',
								type: 'audio/wav',
								lastModified: '2024-03-14',
								downloadUrl: '/download/samples/bass/bass_sub.wav',
								previewAvailable: true
							}
						]
					},
					synths: {
						name: 'Synths',
						count: 15,
						size: '320 MB',
						files: [
							{
								name: 'lead_synth.wav',
								size: '3.1 MB',
								type: 'audio/wav',
								lastModified: '2024-03-14',
								downloadUrl: '/download/samples/synths/lead_synth.wav',
								previewAvailable: true
							}
						]
					}
				}
			},
			stems: {
				count: 8,
				size: '320 MB',
				format: 'WAV 24bit/48kHz',
				files: [
					{
						name: 'drums.wav',
						size: '45 MB',
						type: 'audio/wav',
						lastModified: '2024-03-14',
						downloadUrl: '/download/stems/drums.wav',
						previewAvailable: true
					},
					{
						name: 'bass.wav',
						size: '38 MB',
						type: 'audio/wav',
						lastModified: '2024-03-14',
						downloadUrl: '/download/stems/bass.wav',
						previewAvailable: true
					},
					{
						name: 'synths.wav',
						size: '42 MB',
						type: 'audio/wav',
						lastModified: '2024-03-14',
						downloadUrl: '/download/stems/synths.wav',
						previewAvailable: true
					}
				]
			},
			presets: {
				count: 5,
				size: '2 MB',
				plugins: ['Serum', 'Massive X'],
				files: [
					{
						name: 'lead.fxp',
						size: '256 KB',
						type: 'preset/serum',
						plugin: 'Serum',
						lastModified: '2024-03-14',
						downloadUrl: '/download/presets/lead.fxp',
						previewAvailable: false
					},
					{
						name: 'bass.fxp',
						size: '234 KB',
						type: 'preset/massive',
						plugin: 'Massive X',
						lastModified: '2024-03-14',
						downloadUrl: '/download/presets/bass.fxp',
						previewAvailable: false
					}
				]
			}
		},
		technicalInfo: {
			daw: 'Ableton Live',
			dawVersion: '11.2.6',
			size: '2.1 GB',
			requiredPlugins: [
				{ name: 'Serum', version: '1.2.3', required: true },
				{ name: 'Fabfilter Pro-Q 3', version: '3.0.0', required: true },
				{ name: 'Valhalla Vintage Verb', version: '2.1.0', required: true }
			],
			compatibility: {
				mac: true,
				windows: true,
				minimumOs: 'macOS 10.15 / Windows 10',
				recommendedSpecs: '16GB RAM, 4+ Core CPU'
			}
		},
		comments: {
			count: 12,
			items: [
				{
					id: 1,
					author: {
						name: 'Jane Smith',
						avatar: '/api/placeholder/40/40',
						isVerified: true
					},
					content:
						'Love the summer vibes in this! The percussion is on point. The way you mixed the analog synths with the organic percussion samples creates such a unique atmosphere.',
					timestamp: '2 hours ago',
					likes: 5,
					isLiked: false,
					replies: [
						{
							id: 2,
							author: {
								name: 'JohnDoe',
								avatar: '/api/placeholder/40/40',
								isVerified: true,
								isOP: true
							},
							content:
								'Thanks! I used a combination of vintage drum machines and live percussion samples to get that organic feel.',
							timestamp: '1 hour ago',
							likes: 2,
							isLiked: false
						}
					]
				},
				{
					id: 3,
					author: {
						name: 'Mike Wilson',
						avatar: '/api/placeholder/40/40',
						isVerified: false
					},
					content:
						'That bassline at 1:45 is incredible! Mind sharing what synth you used for that?',
					timestamp: '5 hours ago',
					likes: 3,
					isLiked: true,
					replies: []
				}
			]
		},
		history: {
			currentVersion: '1.2.0',
			versions: [
				{
					version: '1.2.0',
					date: '2024-03-14',
					author: {
						name: 'JohnDoe',
						avatar: '/api/placeholder/40/40'
					},
					changes: [
						{
							type: 'added',
							description: 'Added new percussion stems'
						},
						{
							type: 'modified',
							description: 'Updated mix levels for better balance'
						},
						{
							type: 'fixed',
							description: 'Fixed timing issues in bass section'
						}
					],
					isLatest: true
				},
				{
					version: '1.1.0',
					date: '2024-03-10',
					author: {
						name: 'JohnDoe',
						avatar: '/api/placeholder/40/40'
					},
					changes: [
						{
							type: 'added',
							description: 'Added synth presets'
						},
						{
							type: 'modified',
							description: 'Revised arrangement structure'
						}
					],
					isLatest: false
				},
				{
					version: '1.0.0',
					date: '2024-03-01',
					author: {
						name: 'JohnDoe',
						avatar: '/api/placeholder/40/40'
					},
					changes: [
						{
							type: 'added',
							description: 'Initial project release'
						}
					],
					isLatest: false
				}
			]
		}
	};

	return {
		project
	};
}) satisfies PageServerLoad;
