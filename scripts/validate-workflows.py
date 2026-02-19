#!/usr/bin/env python3

"""
Script to validate GitHub Actions workflows
Checks YAML syntax and common issues
"""

import yaml
import os
import glob

def main():
    workflows_dir = '.github/workflows'
    has_errors = False
    
    print('🔍 Validating GitHub Actions workflows...\n')
    
    # Read all workflow files
    files = sorted(glob.glob(os.path.join(workflows_dir, '*.yml')) + 
                   glob.glob(os.path.join(workflows_dir, '*.yaml')))
    
    for file_path in files:
        file_name = os.path.basename(file_path)
        try:
            with open(file_path, 'r') as f:
                workflow = yaml.safe_load(f)
            
            # Basic validation
            issues = []
            
            if not workflow.get('name'):
                issues.append('Missing workflow name')
            
            # 'on' is a YAML boolean keyword, so it gets parsed as True
            has_trigger = True in workflow or 'on' in workflow
            if not has_trigger:
                issues.append('Missing trigger configuration')
            
            if not workflow.get('jobs') and not workflow.get(True, {}).get('jobs'):
                issues.append('No jobs defined')
            
            # Check for common issues
            on_config = workflow.get(True, workflow.get('on', {}))
            if isinstance(on_config, dict):
                if on_config.get('pull_request_target') and not workflow.get('permissions'):
                    issues.append('pull_request_target without explicit permissions (security risk)')
            
            # Check job structure
            jobs = workflow.get('jobs', {})
            if not jobs or len(jobs) == 0:
                issues.append('No jobs defined')
                
            for job_name, job in jobs.items():
                if not job.get('steps') or len(job.get('steps', [])) == 0:
                    issues.append(f"Job '{job_name}' has no steps")
                
                if not job.get('runs-on'):
                    issues.append(f"Job '{job_name}' missing runs-on")
            
            if issues:
                print(f'⚠️  {file_name}')
                for issue in issues:
                    print(f'   - {issue}')
                print()
            else:
                print(f'✓ {file_name}')
        
        except Exception as e:
            print(f'✗ {file_name}')
            print(f'   Error: {str(e)}')
            print()
            has_errors = True
    
    if has_errors:
        print(f'\n❌ Some workflows have errors')
        exit(1)
    else:
        print(f'\n✅ All {len(files)} workflows are valid')

if __name__ == '__main__':
    main()

