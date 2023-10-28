using System.Diagnostics;

namespace Task;

internal class ProcessToExecute
{
    internal static async Task<string> RunСommandAsync(string input)
    {
        var powershell = new Process();
        powershell.StartInfo.FileName = "powershell.exe";
        powershell.StartInfo.Arguments = input;
        powershell.StartInfo.UseShellExecute = false;
        powershell.StartInfo.CreateNoWindow = true;
        powershell.StartInfo.RedirectStandardOutput = true;
        powershell.StartInfo.RedirectStandardError = true;
        powershell.Start();
        var outputCompleted = powershell.StandardOutput;
        var outputFailure = powershell.StandardError;
        var output = string.Concat(outputCompleted.ReadToEnd(), outputFailure.ReadToEnd());
        await powershell.WaitForExitAsync();
        return output;
    }
}