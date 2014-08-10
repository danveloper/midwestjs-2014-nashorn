#!/usr/bin/env jjs -scripting

function usage() {
  print(<<EOD);
./gitinfo.js -- <repo>

 - repo      : [required] : path to the directory of git repository you are
                            analyzing

EOD
  quit();
}

var File = Java.type("java.io.File");

// Capture the repository that we'll be analyzing
var repo = $ARG[0];

if (!repo) {
  usage();
}

var repoDir = new File(repo);
if (!repoDir.isDirectory()) {
  print("ERROR: That's not a directory!\n");
  usage();
}


var gitinfo = `git -C ${repoDir} --no-pager log --shortstat`.split('\n');
var stats = {};
stats._totals = { inserts: 0, deletes: 0 };
var author, buf;
for each (info in gitinfo) {
  if (/^commit/.test(info) && author) {
    if (!stats.hasOwnProperty(author)) {
      stats[author] = { inserts: 0, deletes: 0 };
    }

    var stat = buf[buf.length-2].trim();
    var parts = stat.split(',');
    if (/^[0-9]/.test(parts[0].trim())) {
      var inserts = parseInt(parts[1].trim().split(' ')[0]);
      var deletes = parts.length > 2 ? parseInt(parts[2].trim().split(' ')[0]) : 0;
      stats._totals.inserts = stats._totals.inserts + inserts;
      stats._totals.deletes = stats._totals.deletes + deletes;
      stats[author].inserts += inserts;
      stats[author].deletes += deletes;
    }

    author = null;
    buf = null;
  }
  if (/^Author/.test(info)) {
    author = info.split(':')[1].trim().split('<')[0].trim();
    buf = [];
  }
  if (author) {
    buf.push(info);
  }
}

var results = [];
for (var key in stats) {
  if (key.startsWith("_")) continue;

  var gitStat = stats[key];
  results.push({ author: key, inserts: gitStat.inserts, deletes: gitStat.deletes });
}

function leaderBoard(array, field) {
  var columnWidth = 80
  print("LEADERBOARD: ${field}");
  print(Array(columnWidth).join('-'));
  for each (result in sort(array, field)) {
    var pct = ((result[field] / stats._totals[field]) * 100).toFixed(2);
    var pad = 1;
    if (pct.toString().length == 5) {
      pad += 1;
    } else if (pct.toString().length == 4) {
      pad += 2;
    }
    print("${result.author}${Array(columnWidth-8-result.author.length).join('.')}|${Array(pad).join(' ')}${pct}%");
  }
  print("");
}

function sort(array, field) {
  return array.sort(function(a, b) {
    if (a[field] > b[field])
      return -1
    else if (b[field] > a[field])
      return 1
    else
      return 0
  });
}

leaderBoard(results,"inserts");
leaderBoard(results,"deletes");

quit();
