module.exports = ({github, context, mainWorkflowRunSha, coverageFilePath}) => {
    console.log('in compare_coverage')
    const fs = require('fs')

    function computeTotalCoverage(data) {
        let totalLines = 0
        let coveredLines = 0
        for (const fileName of Object.keys(data)) {
            const lines = data[fileName].s
            totalLines += lines.length
            const coveredLinesForFile = lines.filter((line) => line > 0)
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

            if (prTotalCoverage > mainTotalCoverage) {
                // Coverage increased
                console.log("Coverage Increased")
            } else if (prCoverageData < mainTotalCoverage) {
                // Coverage decreased
                console.log("Coverage decreased")
            } else {
                // Coverage is the same
                console.log("Covearge is the same")
            }
        })
    })
}