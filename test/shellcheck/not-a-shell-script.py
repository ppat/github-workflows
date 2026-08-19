#!/usr/bin/env python3
"""Executable non-shell script for testing lint-shellcheck.

The selector must skip this. Handing it to shellcheck fails with SC1071
("ShellCheck only supports sh/bash/dash/ksh"), which is what an executable-bit
-only file selector used to do.
"""

print("Sample script for testing lint-shellcheck...")
