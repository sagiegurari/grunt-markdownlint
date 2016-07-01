<a name="Task"></a>

## Task
**Kind**: global class  
**Access:** public  
**Author:** Sagie Gur-Ari  

* [Task](#Task)
    * [new Task()](#new_Task_new)
    * [#runMarkdownLint(grunt, data, filesSrc, callback)](#Task+runMarkdownLint)

<a name="new_Task_new"></a>

### new Task()
Exposes the markdown linting task as a function.

**Example**  
````js
//to use via grunt, first load the task
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
//or load it manually
grunt.loadNpmTasks('grunt-markdownlint');

grunt.initConfig({
  markdownlint: {
    full: {
      options: {
        config: { //configure the linting rules
          'default': true,
          'line-length': false,
          'blanks-around-headers': false,
          'no-duplicate-header': false,
          'no-inline-html': false
        }
      },
      src: [
        'README.md',
        'docs/api.md'
      ]
    }
  }
});

grunt.registerTask('default', ['markdownlint']);
````
<a name="Task+runMarkdownLint"></a>

### Task#runMarkdownLint(grunt, data, filesSrc, callback)
Runs the markdown linting task.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| grunt | <code>object</code> | The grunt object |
| data | <code>object</code> | All raw user configured data |
| filesSrc | <code>Array</code> | The src files to lint |
| callback | <code>function</code> | Callback function invoked with true/false if valid linting result |

