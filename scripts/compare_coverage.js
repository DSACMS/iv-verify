module.exports = ({github, context, mainWorkflowRunSha, coverageFilePath}) => {
    console.log('in compare_coverage')
    const fs = require('fs')

    function computeTotalCoverage(data) {
        let totalLines = 0
        let coveredLines = 0
        for (const fileName of Object.keys(data)) {
            const lines = data[fileName].s
            totalLines += lines.length

            const coveredLinesForFile = Object.values(lines).filter((line) => line > 0)
            coveredLines += coveredLinesForFile.length
        }

        if (totalLines == 0) {
            return 0
        }

        return Math.floor((coveredLines / totalLines) * 100)
    }

    fs.readFile("coverage/coverage.json", function(err, data) {
        if (err) { throw err }

        const prCoverageData = JSON.parse(data)

        fs.readFile(`${coverageFilePath}/coverage.json`, function(err, data) {
            if (err) { throw err }

            const mainCoverageData = JSON.parse(data)

            const prTotalCoverage = computeTotalCoverage(prCoverageData)
            const mainTotalCoverage = computeTotalCoverage(mainCoverageData)

            let message = ""
            if (prTotalCoverage > mainTotalCoverage) {
                // Coverage increased
                message = "Coverage Increased"
            } else if (prCoverageData < mainTotalCoverage) {
                // Coverage decreased
                message = "Coverage decreased"
            } else {
                // Coverage is the same
                message = "Covearge is the same"
            }

            github.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: github.event.number,
                body: message,
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                }
              })
        })
    })
}