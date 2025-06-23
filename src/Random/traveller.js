/**
 * 
A traveler visited a series of unique landmarks on a journey. Unfortunately, their travel journal was damaged, and they can no longer remember the exact order of their visits. However, they do have a collection of photos, each showing exactly two landmarks that were visited consecutively (either landmark could have been visited first).
Given the collection of photos represented as pairs of landmark IDs in travel Photos, help the traveler reconstruct the complete journey. Each landmark was visited exactly once, and for every consecutive pair of landmarks in the journey, there exists a photo containing both landmarks.
You may reconstruct the journey in either forward or reverse order - both are considered correct.
Example
For travelPhotos
=
[[3, 5], [1, 4], [2, 4], [1, 5]], the output can be
solution (travelPhotos)
Explanation:
=
[3, 5, 1, 4, 2]
• The photos show that landmarks 3 and 5 were visited consecutively, as were 1 and 4, 2 and 4, and 1 and 5.
By analyzing these connections, we can determine the traveler's journey was [3, 5, 1, 4, 2].
• The reverse journey [2, 4, 1, 5, 3] is also a valid answer.
 */

const findOrder = (photos) => {
  /**
   * to track the index of the image holding the landmark
   * { 3: [0], 5: [0, 3], 1: [1, 3], 4: [1, 2], 2: [2] }
   */
  const trackedLandmarks = new Map()
  //to find the landmarks that appears only once
  //[3,2]
  const onceOccuringLandmarks = new Set()
  const orderedLandmarks = []

  const updateTrackedLandmarks = (landmark, i) => {
    if (trackedLandmarks.has(landmark)) {
      const cachedLandmark = trackedLandmarks.get(landmark)
      cachedLandmark.push(i)

      // if the landmark is cached before, this is the second time it occurs so remove from the set
      onceOccuringLandmarks.delete(landmark);
    } else {
      trackedLandmarks.set(landmark, [i])
      onceOccuringLandmarks.add(landmark)
    }
  }

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i]
    updateTrackedLandmarks(photo[0], i)
    updateTrackedLandmarks(photo[1], i)
  }

  if (onceOccuringLandmarks.size !== 2) {
    return '' // Invalid input
  }

  let currentLandmark = onceOccuringLandmarks.values().next().value;
  orderedLandmarks.push(currentLandmark)

  let currentLandmarkIndex = trackedLandmarks.get(currentLandmark)[0]

  //[[3, 5], [1, 4], [2, 4], [1, 5]]
  let currentPhoto = photos[currentLandmarkIndex]

  while (true) {
    const nextLandmark = currentPhoto[0] === currentLandmark ? currentPhoto[1] : currentPhoto[0]
    orderedLandmarks.push(nextLandmark)

    const nextTracked = trackedLandmarks.get(nextLandmark)

    if (nextTracked.length === 1) {
      break
    }
    currentLandmarkIndex = nextTracked.find(index => index !== currentLandmarkIndex)

    currentPhoto = photos[currentLandmarkIndex]
    currentLandmark = nextLandmark
  }
  return orderedLandmarks.join()
}

//Chat GPT generated test cases
const tests = [
  {
    name: "Minimal Case",
    input: [[1, 2]],
    output: ["1,2", "2,1"]
  },
  {
    name: "Simple Path with 3 Landmarks",
    input: [[1, 2], [2, 3]],
    output: ["1,2,3", "3,2,1"]
  },
  {
    name: "Unordered Input",
    input: [[4, 2], [1, 2], [3, 4]],
    output: ["1,2,4,3", "3,4,2,1"]
  },
  {
    name: "Original Sample Case",
    input: [[3, 5], [1, 4], [2, 4], [1, 5]],
    output: ["3,5,1,4,2", "2,4,1,5,3"]
  },
  {
    name: "Longer Journey (6 Landmarks)",
    input: [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
    output: ["1,2,3,4,5,6", "6,5,4,3,2,1"]
  },
  {
    name: "Non-Sorted Landmark IDs",
    input: [[100, 300], [200, 300], [200, 500]],
    output: ["100,300,200,500", "500,200,300,100"]
  },
  {
    name: "Disconnected Graph (Invalid Input)",
    input: [[1, 2], [3, 4]],
    output: []
  },
  {
    name: "Cycle Graph (Invalid)",
    input: [[1, 2], [2, 3], [3, 1]],
    output: []
  },
  {
    name: "Duplicate Photos",
    input: [[1, 2], [2, 3], [1, 2]],
    output: ["1,2,3", "3,2,1"]
  },
  {
    name: "Large Input (1000 nodes)",
    input: Array.from({ length: 1000 }, (_, i) => [i + 1, i + 2]),
    output: [
      Array.from({ length: 1001 }, (_, i) => i + 1).join(","),
      Array.from({ length: 1001 }, (_, i) => 1001 - i).join(",")
    ]
  },
  {
    name: "High Landmark IDs",
    input: [[9998, 9999], [9999, 10000]],
    output: ["9998,9999,10000", "10000,9999,9998"]
  },
  {
    name: "Reversed Pair Ordering",
    input: [[3, 2], [1, 2]],
    output: ["1,2,3", "3,2,1"]
  },
  {
    name: "Non-Consecutive Landmark Numbers",
    input: [[100, 300], [500, 300]],
    output: ["100,300,500", "500,300,100"]
  },
  {
    name: "Four Nodes, Mixed Input Order",
    input: [[2, 3], [4, 1], [1, 2]],
    output: ["4,1,2,3", "3,2,1,4"]
  },
  {
    name: "Random Pair Order",
    input: [[5, 6], [1, 2], [4, 5], [2, 3], [3, 4]],
    output: ["1,2,3,4,5,6", "6,5,4,3,2,1"]
  },
  {
    name: "Branching Path (Invalid Input)",
    input: [[1, 2], [2, 3], [2, 4]],
    output: []
  },
  {
    name: "Multiple Duplicates",
    input: [[1, 2], [2, 3], [3, 4], [1, 2], [2, 3]],
    output: ["1,2,3,4", "4,3,2,1"]
  },
  {
    name: "All Pairs Reversed",
    input: [[4, 3], [3, 2], [2, 1]],
    output: ["1,2,3,4", "4,3,2,1"]
  },
  {
    name: "Mixed Input with Redundant Repeats",
    input: [[10, 11], [9, 10], [8, 9], [9, 10]],
    output: ["8,9,10,11", "11,10,9,8"]
  },
  {
    name: "Non-Sequential IDs",
    input: [[300, 200], [200, 100], [100, 400]],
    output: ["300,200,100,400", "400,100,200,300"]
  }
];


tests.forEach(testCase => {
  const result = findOrder(testCase.input)

  console.log(`Runnning: ${testCase.name} - ${testCase.output.includes(result)}`)
})