module.exports = ({github, context, mainWorkflowRunSha, coverageFilePath, prNumber}) => {
    const fs = require('fs')

    function computeTotalCoverage(data) {
        let totalLines = 0
        let coveredLines = 0
        for (const fileName of Object.keys(data)) {
            const lines = data[fileName].s
            totalLines += Object.keys(lines).length

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

            let message = "This pull request "
            if (prTotalCoverage > mainTotalCoverage) {
                // Coverage increased
                message = `This pull request raised the overall code coverage by ${prTotalCoverage-mainTotalCoverage}`
            } else if (prTotalCoverage < mainTotalCoverage) {
                // Coverage decreased
                message = `This pull request lowered the overall code coverage by ${mainTotalCoverage-prTotalCoverage}`
            } else {
                // Coverage is the same
                message = "This pull request did not change the overall code coverage."
            }

            github.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: prNumber,
                body: message,
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                }
              })
        })
    })
}