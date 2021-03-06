module.exports = function ( grunt ) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			dist: {
				options: {
					banner: '/*!\nUploadify <%= pkg.version %>\nRelease Date: <%= grunt.template.today("mmmm dd, yyyy") %>\nCopyright (c) 2009 <%= pkg.contributors[0] %>, <%= pkg.contributors[1] %> | License: <%= pkg.license %>\n*/\n'
				},
				files: {
					'jquery.uploadify.min.js': ['jquery.uploadify.js']
				}
			}
		},

		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				updateConfigs: ['pkg'],
				commit: true,
				commitMessage: 'Release %VERSION%',
				commitFiles: ['-a'],
				createTag: true,
				tagName: '%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: false
			}
		}

	});

	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-bump' );

	grunt.registerTask( 'default', ['uglify:dist'] );
	grunt.registerTask( 'releasePatch', ['bump-only:patch', 'default', 'bump-commit'] );
	grunt.registerTask( 'releaseMinor', ['bump-only:minor', 'default', 'bump-commit'] );
	grunt.registerTask( 'releaseMajor', ['bump-only:major', 'default', 'bump-commit'] );

};
