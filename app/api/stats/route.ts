import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const revalidate = 43200; // Cache for 12 hours to prevent rate limits

export async function GET() {
  const stats = {
    leetcode: 113, // Fallback
    codechef: 894, // Fallback
    gfg: 69,       // Fallback
    youngTurks: 97 // Static
  };

  try {
    const leetcodeUsername = 'vaibhav1819';
    const codechefUsername = 'vaibhavram19';
    const gfgUsername = '23951aaucr';

    // 1. Fetch LeetCode Data (GraphQL)
    try {
      const lcResponse = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query getUserProfile($username: String!) {
              matchedUser(username: $username) {
                submitStats: submitStatsGlobal {
                  acSubmissionNum {
                    difficulty
                    count
                  }
                }
              }
            }
          `,
          variables: { username: leetcodeUsername }
        })
      });
      const lcData = await lcResponse.json();
      const allSubmissions = lcData?.data?.matchedUser?.submitStats?.acSubmissionNum;
      if (allSubmissions) {
        const total = allSubmissions.find((s: any) => s.difficulty === 'All');
        if (total && total.count > 0) stats.leetcode = total.count;
      }
    } catch (e) {
      console.error("LeetCode fetch error:", e);
    }

    // 2. Fetch CodeChef Data (HTML Scraping)
    try {
      const ccResponse = await fetch(`https://www.codechef.com/users/${codechefUsername}`);
      const ccHtml = await ccResponse.text();
      const $cc = cheerio.load(ccHtml);
      // Grab only the FIRST rating number to avoid concatenating ranks
      const ratingText = $cc('.rating-number').first().text();
      if (ratingText) {
        const ratingNum = parseInt(ratingText.replace(/\D/g, ''), 10);
        if (!isNaN(ratingNum) && ratingNum > 0) stats.codechef = ratingNum;
      }
    } catch (e) {
      console.error("CodeChef fetch error:", e);
    }

    // 3. Fetch GeeksForGeeks Data (HTML Scraping)
    try {
      // GFG usually uses auth.geeksforgeeks.org/user/username
      const gfgResponse = await fetch(`https://auth.geeksforgeeks.org/user/${gfgUsername}/`);
      const gfgHtml = await gfgResponse.text();
      const $gfg = cheerio.load(gfgHtml);
      
      // Look for the "Problems Solved" container
      // GFG DOM is volatile, but often score values are inside specific spans
      let foundScore = false;
      $gfg('.scoreCard_head_left--score').each((i, el) => {
        const val = parseInt($gfg(el).text().replace(/\D/g, ''), 10);
        if (!isNaN(val) && val > stats.gfg) {
          stats.gfg = val;
          foundScore = true;
        }
      });
      
      // Fallback: search raw text for "Problems Solved : <number>" if specific class isn't found
      if (!foundScore) {
          const rawText = $gfg.text();
          const match = rawText.match(/Problems Solved[^\d]*(\d+)/i);
          if (match && match[1]) {
             const val = parseInt(match[1], 10);
             if (val > stats.gfg) stats.gfg = val;
          }
      }
    } catch (e) {
      console.error("GFG fetch error:", e);
    }

    return NextResponse.json(stats);

  } catch (error) {
    console.error("Critical API Stats Error:", error);
    return NextResponse.json(stats); // Return fallbacks on critical fail
  }
}
